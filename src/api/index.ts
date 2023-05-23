import { Router } from 'express';
import todos from './routes/todos';

const routes = () => {
  const app = Router();
  todos(app);

  return app;
};

export default routes;
