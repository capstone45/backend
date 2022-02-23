import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';

function userController(userService: UserService): UserController {
	return new UserController(userService);
}

function userService(userRepository: UserRepository): UserService {
	return new UserService(userRepository);
}

function userRepository(): UserRepository {
	return new UserRepository();
}

function initController() {
	userController(userService(userRepository()));
}

export default initController;
