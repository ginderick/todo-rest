import {AnyZodObject} from 'zod';

export type RequestValidator = {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
};

export type Payload = {
  sub: string;
  iat: number;
  exp: number;
};

export type UserCreate = {
  username: string;
  password: string;
};

export type TodoCreate = {
  name: string;
  description: string;
  remarks: string;
};
