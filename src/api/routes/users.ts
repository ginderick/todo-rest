import TokenService from '../../services/tokens';
import UsersService from '../../services/users';
import {NextFunction, Request, Response, Router} from 'express';
import Container from 'typedi';
import middlewares from '../middlewares';
import {UserSchema} from '../../schema/UserSchema';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.post(
    '/',
    middlewares.requestValidator({
      body: UserSchema,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  );

  route.post(
    '/login',
    middlewares.requestValidator({
      body: UserSchema,
    }),
    middlewares.authenticate(['local']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const tokenService = Container.get(TokenService);
        const accessToken = await tokenService.generateAccessToken(req.body.username);
        const refreshAccessToken = await tokenService.generateRefreshToken(req.body.username);
        return res.status(200).json({
          access_token: accessToken,
          refresh_token: refreshAccessToken,
        });
      } catch (error) {
        return next(error);
      }
    }
  );

  route.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenService = Container.get(TokenService);
      const {authorization} = req.headers;

      if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.slice(7); // Remove "Bearer " prefix
        tokenService.blacklistToken(token);
      }
      return res.status(200).json({
        message: 'Logout successful',
      });
    } catch (error) {
      return next(error);
    }
  });
};

export default users;
