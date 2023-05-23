import express from 'express';
import routes from '../api';

const expressLoader = ({ app }: { app: express.Application }) => {
  app.use(express.json());
  app.use('/', routes());
};

export default expressLoader;
