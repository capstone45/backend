import { User } from './user';
import DUMMY_DATA from './dummy_data';

export default class UserRepository {
	private readonly userRepository: UserRepository;

	constructor() {
		if (this.userRepository) return this.userRepository;
	}

	async findUserByNickname(nickname: string): Promise<User[]> {
		const findUserList: User[] = await new Promise((res) => {
			setTimeout(() => {
				res(
					Object.values(DUMMY_DATA).filter(
						(userData) => userData.nickname === nickname
					)
				);
			}, 3000);
		});
		return findUserList;
	}
}
