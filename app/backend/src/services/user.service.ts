import { compareSync } from 'bcryptjs';
import Token from '../utils/auth';
import UserModel from '../database/models/UserModel';
import { ILogin } from '../interfaces/login';

class UserService {
  static async login(login: ILogin) {
    const { email, password } = login;

    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      return undefined;
    }

    const userPassword: string = user?.dataValues.password;

    if (!compareSync(password, userPassword)) {
      return undefined;
    }

    const payload = {
      email: user.dataValues.email,
      role: user.dataValues.role,
    };

    const token = Token.generateToken(payload);
    return token;
  }

  static async getUserRole(email: string): Promise<string> {
    const user = await UserModel.findOne({
      where: { email },
    });
    return user?.dataValues.role;
  }
}

export default UserService;
