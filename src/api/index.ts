import {Router} from 'express';
import todos from './routes/todos';
import users from './routes/users';

const routes = () => {
  const app = Router();
  todos(app);
  users(app);

  return app;
};

export default routes;
