import { NextFunction, Request, Response } from 'express';
import Token from './auth';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => password.length >= 6;

const validateLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const isEmailValid = isValidEmail(email);
  if (!isEmailValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = isValidPassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const payload = Token.validateToken(authorization);
    req.body.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { validateLoginFields, authToken };
