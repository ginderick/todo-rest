import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import prisma from '../../../prisma';
import {Payload} from '../../types';
import config from '../../config';
import {Request} from 'express';

const jwtOptions = {
  secretOrKey: config.token.privateJWTKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

export const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (req: Request, payload: Payload, done: any) => {
    try {
      const username = payload.sub;
      const user = await prisma.user.findUnique({where: {username: username}});
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)!;

      const blacklistToken = await prisma.blacklistedToken.findUnique({
        where: {
          token: token,
        },
      });

      if (!user || blacklistToken) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
