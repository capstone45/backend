import { AbstractUserRepository, AbstractUserService, User } from './user';

export default class UserService implements AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(userRepository: AbstractUserRepository): AbstractUserService {
		if (!UserService.instance) {
			UserService.instance = new UserService(userRepository);
		}
		return UserService.instance;
	}

	private constructor(userRepository: AbstractUserRepository) {
		UserService.userRepository = userRepository;
	}

	async findUserById(id: number): Promise<User> {
		const findUser = await UserService.userRepository.findUserById(id);
		return findUser;
	}

	async findUserByNickname(nickname: string): Promise<User[]> {
		const findUserList = await UserService.userRepository.findUserByNickname(nickname);
		return findUserList;
	}
}
