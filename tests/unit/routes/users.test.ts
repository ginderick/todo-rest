import request from 'supertest';
import express from 'express';
import 'reflect-metadata';
import {prismaMock} from '../../singleton';
import {loginPayload, loginWrongPasswordPayload, user} from '../../utils/utils';

let server;
beforeEach(async () => {
  const app = express();
  await require('../../../src/loaders').default({expressApp: app});
  server = app.listen(0);
});

afterEach(async () => {
  await server.close();
});

describe('POST /users/login', () => {
  it('should return 200 for successful login', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);
    const res = await request(server).post('/users/login').send(loginPayload);
    expect(res.status).toBe(200);
  });

  it('should return 401 for unsuccessful log', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);
    const res = await request(server).post('/users/login').send(loginWrongPasswordPayload);
    expect(res.status).toBe(401);
  });
});

describe('POST /users', () => {
  it('should return 201 for successful user creation', async () => {
    prismaMock.user.create.mockResolvedValue(user);
    const res = await request(server).post('/users').send(loginPayload);
    expect(res.status).toBe(201);
  });
});

describe('POST /users/logout', () => {
  it('should return 200 for successful logout', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaW5kZXJpY2s2IiwiaWF0IjoxNjg0ODU1MDk2LCJleHAiOjE2ODQ4NTUzOTZ9.Nz94QOz7IFjLg-vBodP7tiQ-xKLTtoAe0_fDumOBMUU';

    const tokenData = {
      id: 1,
      token: token,
      createdAt: new Date(),
    };
    prismaMock.blacklistedToken.create.mockResolvedValue(tokenData);
    const res = await request(server).post('/users/logout').send(loginPayload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
