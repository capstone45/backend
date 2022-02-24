import { User } from './user';
import UserEntity from './user.entity';
import { Connection } from 'typeorm';
import { AbstractUserRepository } from './user';

export default class UserRepository implements AbstractUserRepository {
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

	async findUserById(id: number): Promise<User> {
		const findResult = await UserRepository.connection
			.getRepository(UserEntity)
			.findOne(id);
		return findResult;
	}

	async findUserByNickname(nickname: string): Promise<User[]> {
		const findResultList = await UserRepository.connection
			.getRepository(UserEntity)
			.find({ where: { nickname: nickname } });
		return findResultList;
	}
}
