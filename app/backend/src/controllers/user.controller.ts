import { Request, Response } from 'express';
import { ILogin } from '../interfaces/login';
import UserService from '../services/user.service';

class UserController {
  static async login(req: Request, res: Response) {
    const login: ILogin = req.body;
    const token = await UserService.login(login);

    if (token) {
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  }

  static async getUserRole(req: Request, res: Response) {
    const { email } = req.body.user as { email: string };
    const userRole = await UserService.getUserRole(email);

    return res.status(200).json({ role: userRole });
  }
}

export default UserController;
