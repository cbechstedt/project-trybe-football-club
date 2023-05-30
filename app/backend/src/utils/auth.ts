import * as jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/jwtPayload';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const configJWT: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

class Token {
  static generateToken(payload: IPayload) {
    const token = jwt.sign(payload, secret, configJWT);
    return token;
  }

  static validateToken(token: string) {
    const payload = jwt.verify(token, secret);
    return payload;
  }

  // static decodeToken(token: string) {
  //   const decodedToken = jwt.decode(token);
  //   return decodedToken;
  // }
}

export default Token;
