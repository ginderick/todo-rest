import jwt from 'jsonwebtoken';

export default class TokenService {
  public async generateAccessToken(username: string) {
    const token = jwt.sign({sub: username}, 'secretKey', {expiresIn: '5m'});
    return token;
  }

  public async generateRefreshToken(username: string) {
    const token = jwt.sign({sub: username}, 'secretKey', {expiresIn: '24h'});
    return token;
  }
}
