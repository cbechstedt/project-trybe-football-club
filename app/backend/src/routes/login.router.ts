import express = require('express');
import UserController from '../controllers/user.controller';
import { authToken, validateLoginFields } from '../utils/middlewares';

const loginRouter = express.Router();

loginRouter.post('/', validateLoginFields, UserController.login);
loginRouter.get('/role', authToken, UserController.getUserRole);

export default loginRouter;
