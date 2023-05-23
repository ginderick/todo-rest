import TodosService from '../../services/todos';
import {NextFunction, Request, Response, Router} from 'express';
import Container from 'typedi';

const route = Router();

const todos = (app: Router) => {
  app.use('/todos', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todosService = Container.get(TodosService);

      const page = +req.query.page! || 1;
      const limit = +req.query.limit! || 10;

      const todos = await todosService.getTodos(page, limit);
      return res.status(200).json({
        page: page,
        data: todos,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todosService = Container.get(TodosService);

      const id = +req.params.id!;

      const todo = await todosService.getTodo(id);

      if (todo) {
        return res.status(200).json(todo);
      } else {
        return res.status(404).json({message: 'item not found'});
      }
    } catch (error) {
      return next(error);
    }
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todosService = Container.get(TodosService);
      const todos = await todosService.addTodo(req.body);
      return res.status(201).json({
        message: 'Todo item created successfully',
        data: todos,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todosService = Container.get(TodosService);

      const id = +req.params.id!;
      const updatedFields = req.body;

      const todo = await todosService.updateTodo(id, updatedFields);

      if (!todo) return res.status(401).json({message: 'item not found'});
      return res.status(201).json({
        message: 'Todo item updated successfully',
        data: todo,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todosService = Container.get(TodosService);

      const id = +req.params.id!;

      const todo = await todosService.deleteTodo(id);

      return res.status(200).json({
        message: 'Todo item deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  });
};

export default todos;
