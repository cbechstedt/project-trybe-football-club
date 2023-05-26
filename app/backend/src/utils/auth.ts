import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const configJWT: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

class Token {
  static generateToken(email: string) {
    const payload = { email };
    const token = jwt.sign(payload, secret, configJWT);
    return token;
  }
}

export default Token;
