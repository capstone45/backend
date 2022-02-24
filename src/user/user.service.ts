import UserRepository from './user.repository';
import { User } from './user';

export default class UserService {
	private static instance: UserService;
	private static userRepository: UserRepository;

	public static getInstance(userRepository: UserRepository): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService(userRepository);
		}
		return UserService.instance;
	}

	private constructor(userRepository: UserRepository) {
		UserService.userRepository = userRepository;
	}

	async findUserById(id: number) {
		const findUser = await UserService.userRepository.findUserById(id);
		return findUser;
	}

	async findUserByNickname(nickname: string) {
		const findUserList = await UserService.userRepository.findUserByNickname(
			nickname
		);
		return findUserList;
	}
}
