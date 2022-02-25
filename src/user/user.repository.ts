import { Connection, EntitySchema } from 'typeorm';
import { User, AbstractUserRepository } from './user';

export default class UserRepository implements AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static connection: Connection;
	private static entity: EntitySchema;

	public static getInstance(connection: Connection, entity: EntitySchema): AbstractUserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository(connection, entity);
		}
		return UserRepository.instance;
	}

	private constructor(connection: Connection, entity: EntitySchema) {
		UserRepository.connection = connection;
		UserRepository.entity = entity;
	}

	async findUserById(id: number): Promise<User> {
		const findResult = await UserRepository.connection.getRepository(UserRepository.entity).findOne(id);

		return findResult;
	}

	async findUserByNickname(nickname: string): Promise<User[]> {
		const findResultList = await UserRepository.connection.getRepository(UserRepository.entity).find({ where: { nickname: nickname } });
		return findResultList;
	}
}
