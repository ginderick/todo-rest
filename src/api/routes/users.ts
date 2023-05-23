import UsersService from '../../services/users';
import {NextFunction, Request, Response, Router} from 'express';
import Container from 'typedi';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersService = Container.get(UsersService);
      const username = await usersService.addUser(req.body);
      return res.status(201).json({
        message: 'User successfully created',
        username,
      });
    } catch (error) {
      return next(error);
    }
  });
};

export default users;
