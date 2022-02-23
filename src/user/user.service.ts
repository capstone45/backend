import UserRepository from './user.repository';
import { User } from './user';

export default class UserService {
	private readonly userService: UserService;
	private readonly userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		if (this.userService) return this.userService;
		this.userService = this;
		this.userRepository = userRepository;
	}

	async getUserList(nickname: string): Promise<User[]> {
		const findUserList = await this.userRepository.findUserByNickname(nickname);
		return findUserList;
	}
}
