import TodosService from '../../services/todos';
import {NextFunction, Request, Response, Router} from 'express';
import Container from 'typedi';

const route = Router();

const todos = (app: Router) => {
  app.use('/todos', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todosService = Container.get(TodosService);
      const todos = await todosService.getTodos();
      return res.status(200).json(todos);
    } catch (error) {}
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todosService = Container.get(TodosService);
      const todos = await todosService.addTodo(req.body);
      return res.status(201).json(todos);
    } catch (error) {}
  });
};

export default todos;
