import TodosService from '../../services/todos';
import {NextFunction, Request, Response, Router} from 'express';
import Container from 'typedi';
import middlewares from '../middlewares';
import {TodoParamSchema, TodoSchema, UpdateTodoSchema} from '../../schema/TodoSchema';
import {TodoCreate, TodoUpdate} from '../../types';

const route = Router();

const todos = (app: Router) => {
  app.use('/todos', route);

  route.get(
    '/',
    middlewares.authenticate(['jwt']),
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  );

  route.get(
    '/:id',
    middlewares.authenticate(['jwt']),
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  );

  route.post(
    '/',
    middlewares.requestValidator({
      body: TodoSchema,
    }),
    middlewares.authenticate(['jwt']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const todosService = Container.get(TodosService);

        const todo: TodoCreate = req.body;
        const todoItem = await todosService.addTodo(todo);
        return res.status(201).json({
          message: 'Todo item created successfully',
          data: todoItem,
        });
      } catch (error) {
        return next(error);
      }
    }
  );

  route.patch(
    '/:id',
    middlewares.requestValidator({
      body: UpdateTodoSchema,
      params: TodoParamSchema,
    }),
    middlewares.authenticate(['jwt']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const todosService = Container.get(TodosService);

        const id = +req.params.id!;
        const updatedFields: TodoUpdate = req.body;

        const todo = await todosService.updateTodo(id, updatedFields);

        if (!todo) return res.status(401).json({message: 'item not found'});
        return res.status(201).json({
          message: 'Todo item updated successfully',
          data: todo,
        });
      } catch (error) {
        return next(error);
      }
    }
  );

  route.delete(
    '/:id',
    middlewares.authenticate(['jwt']),
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  );
};

export default todos;
