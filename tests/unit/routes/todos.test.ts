import request from 'supertest';
import express from 'express';
import 'reflect-metadata';
import {prismaMock} from '../../singleton';
import {loginPayload, todo, todoList, todoPayload, user} from '../../utils/utils';
import {Token} from '../../../src/types';

let server;

const getAccessTokens = async () => {
  prismaMock.user.findUnique.mockResolvedValue(user);
  const res = await request(server).post('/users/login').send(loginPayload);
  const tokens: Token = res.body;
  return tokens;
};
beforeEach(async () => {
  const app = express();
  await require('../../../src/loaders').default({expressApp: app});
  server = app.listen(0);
});

afterEach(async () => {
  await server.close();
});

describe('GET /todos', () => {
  it('should return 200 when getting all todos', async () => {
    prismaMock.todo.findMany.mockResolvedValue(todoList);
    const token = await getAccessTokens();
    const res = await request(server)
      .get('/todos')
      .set('Authorization', `Bearer ${token.access_token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
});

describe('GET /todos/:id', () => {
  it('should return 200 when getting a todo item by its id', async () => {
    prismaMock.todo.findUnique.mockResolvedValue(todo);
    const token = await getAccessTokens();
    const res = await request(server)
      .get('/todos/1')
      .set('Authorization', `Bearer ${token.access_token}`);
    expect(res.status).toBe(200);
  });
});

describe('POST /todos/', () => {
  it('should return 201 when adding a todo', async () => {
    prismaMock.todo.create.mockResolvedValue(todo);
    const token = await getAccessTokens();
    const res = await request(server)
      .post('/todos')
      .set('Authorization', `Bearer ${token.access_token}`)
      .send(todoPayload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
  });
});
