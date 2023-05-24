import dotenv from 'dotenv';
import e from 'express';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

export default {
  port: parseInt(process.env.PORT!, 10),
  token: {
    privateJWTKey: process.env.TOKEN_SECRET_PRIVATE,
  },
};
