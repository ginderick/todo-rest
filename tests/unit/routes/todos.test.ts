import request from 'supertest';
import express from 'express';
import 'reflect-metadata';
import {prismaMock} from '../../singleton';
import {loginPayload, todoList, user} from '../../utils/utils';
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
  });
});
