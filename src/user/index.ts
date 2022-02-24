import express from 'express';

import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import { Connection } from 'typeorm';

function userController(
	userService: UserService,
	app: express.Application
): UserController {
	return UserController.getInstance(userService, app);
}

function userService(userRepository: UserRepository): UserService {
	return UserService.getInstance(userRepository);
}

function userRepository(connection: Connection): UserRepository {
	return UserRepository.getInstance(connection);
}

function initController(app: express.Application, connection: Connection) {
	userController(userService(userRepository(connection)), app);
}

export default initController;
