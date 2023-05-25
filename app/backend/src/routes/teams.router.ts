import express = require('express');
import TeamController from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.get('/', TeamController.findAll);

export default teamRouter;
