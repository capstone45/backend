import { User } from './user';
import DUMMY_DATA from './dummy_data';
import UserEntity from './user.entity';
import { Connection } from 'typeorm';

export default class UserRepository {
	private static instance: UserRepository;
	private static connection: Connection;

	public static getInstance(connection: Connection): UserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository(connection);
		}
		return UserRepository.instance;
	}

	private constructor(connection: Connection) {
		UserRepository.connection = connection;
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

	async findUserById(id: number) {
		const findResult = await UserRepository.connection
			.getRepository(UserEntity)
			.findOne(id);
		return findResult;
	}
}
