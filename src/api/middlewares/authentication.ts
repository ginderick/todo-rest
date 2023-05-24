import {NextFunction, Request, Response} from 'express';
import passport from 'passport';

export const authenticate = (strategies: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(strategies, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({error: info || 'Authentication failed'});
      }
      return next();
    })(req, res, next);
  };
};
