import express = require('express');
import MatchController from '../controllers/match.controller';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.findAll);

export default matchRouter;
