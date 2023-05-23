import { NextFunction, Request, Response, Router } from 'express';

const route = Router();

const todos = (app: Router) => {
  app.use('/todos', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send({ Message: 'Hello world' });
    } catch (error) {}
  });
};

export default todos;
