import express = require('express');
import { authToken } from '../utils/middlewares';
import MatchController from '../controllers/match.controller';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.findAll);
matchRouter.patch('/:id', authToken, MatchController.updateMatch);
matchRouter.patch('/:id/finish', authToken, MatchController.finishMatch);

export default matchRouter;
