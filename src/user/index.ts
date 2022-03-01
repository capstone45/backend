import express from 'express';
import { EntityManager } from 'typeorm';

import { AbstractUserController, AbstractUserRepository, AbstractUserService } from './user';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';

function userController(userService: UserService, app: express.Application): AbstractUserController {
	return UserController.getInstance(userService, app);
}

function userService(userRepository: AbstractUserRepository): AbstractUserService {
	return UserService.getInstance(userRepository);
}

function userRepository(manager: EntityManager): AbstractUserRepository {
	return UserRepository.getInstance(manager);
}

function initController(app: express.Application, manager: EntityManager) {
	userController(userService(userRepository(manager)), app);
}

export default initController;
