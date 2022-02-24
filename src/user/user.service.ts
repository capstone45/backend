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

	async getUserListByNickname(nickname: string): Promise<User[]> {
		const findUserList = await UserService.userRepository.findUserByNickname(
			nickname
		);
		return findUserList;
	}

	async getUserById(id: number) {
		const findUser = await UserService.userRepository.findUserById(id);
		return findUser;
	}
}
