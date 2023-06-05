import express = require('express');
import { authToken, validateCreatedMatch } from '../utils/middlewares';
import MatchController from '../controllers/match.controller';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.findAll);
matchRouter.post('/', authToken, validateCreatedMatch, MatchController.createMatch);
matchRouter.patch('/:id', authToken, MatchController.updateMatch);
matchRouter.patch('/:id/finish', authToken, MatchController.finishMatch);

export default matchRouter;
