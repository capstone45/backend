import express from 'express';
import { Connection } from 'typeorm';

import { AbstractUserController, AbstractUserRepository, AbstractUserService } from './user';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';

import UserEntity from './user.entity';

function userController(userService: UserService, app: express.Application): AbstractUserController {
	return UserController.getInstance(userService, app);
}

function userService(userRepository: AbstractUserRepository): AbstractUserService {
	return UserService.getInstance(userRepository);
}

function userRepository(connection: Connection, UserEntity: any): AbstractUserRepository {
	return UserRepository.getInstance(connection, UserEntity);
}

function initController(app: express.Application, connection: Connection) {
	userController(userService(userRepository(connection, UserEntity)), app);
}

export default initController;
