import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import prisma from '../../../prisma';
import {Payload} from '../../types';
import config from '../../config';

const jwtOptions = {
  secretOrKey: config.token.privateJWTKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: Payload, done: any) => {
  try {
    const username = payload.sub;
    const user = await prisma.user.findUnique({where: {username: username}});
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
