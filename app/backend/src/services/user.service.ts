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
    const userPassword: string = user?.dataValues.password;

    if (!user) {
      return undefined;
    }
    if (!compareSync(password, userPassword)) {
      return undefined;
    }
    const token = Token.generateToken(email);
    return token;
  }
}

export default UserService;
