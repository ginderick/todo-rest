import {RequestValidator} from '../../types';
import {NextFunction, Request, Response} from 'express';
import {AnyZodObject, ZodError} from 'zod';

export const requestValidator = (validators: RequestValidator) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = JSON.parse(error.message);
        res.status(422).json({message: zodError});
        return;
      }
      next(error);
    }
  };
};
