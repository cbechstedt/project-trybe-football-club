import express = require('express');
import UserController from '../controllers/user.controller';
import validateLoginFields from '../utils/middlewares';

const loginRouter = express.Router();

loginRouter.post('/', validateLoginFields, UserController.login);

export default loginRouter;
