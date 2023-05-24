import jwt from 'jsonwebtoken';
import {Service} from 'typedi';
import prisma from '../../prisma';
import config from '../config';

@Service()
export default class TokenService {
  public async generateAccessToken(username: string) {
    const token = jwt.sign({sub: username}, config.token.privateJWTKey!, {expiresIn: '5m'});
    return token;
  }

  public async generateRefreshToken(username: string) {
    const token = jwt.sign({sub: username}, config.token.privateJWTKey!, {expiresIn: '24h'});
    return token;
  }

  public async blacklistToken(token: string) {
    const blacklistedToken = prisma.blacklistedToken.create({
      data: {
        token: token,
      },
    });
    return blacklistedToken;
  }
}
