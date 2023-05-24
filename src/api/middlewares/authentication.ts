import {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import {localStrategy} from '../strategies/localStrategy';
import {jwtStrategy} from '../strategies/jwtStrategy';

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

export const authenticate = (strategies: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(strategies, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({error: 'Authentication failed'});
      }
      return next();
    })(req, res, next);
  };
};
