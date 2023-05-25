import express = require('express');
import TeamController from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.get('/', TeamController.findAll);
teamRouter.get('/:id', TeamController.findById);

export default teamRouter;
