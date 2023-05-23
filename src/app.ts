import express from 'express';
import 'reflect-metadata';
import config from './config';

async function startServer() {
  const app = express();

  const port = config.port;

  await require('./loaders').default({ expressApp: app });

  app
    .listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
