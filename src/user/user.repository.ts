import { EntityManager } from 'typeorm';

import { AbstractUserRepository } from './user';
import User from './user.entity';

export default class UserRepository implements AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;
	private static PUBLIC_INFO = ['user.id', 'user.nickname', 'user.thumbnailUrl', 'user.description', 'user.grade'];

	public static getInstance(em: EntityManager): AbstractUserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository(em);
		}
		return UserRepository.instance;
	}

	private constructor(em: EntityManager) {
		UserRepository.em = em;
	}

	async findUserById(id: number): Promise<Partial<User>> {
		const findResult = await UserRepository.em
			.getRepository(User)
			.createQueryBuilder('user')
			.select(UserRepository.PUBLIC_INFO)
			.where('user.id=:id', { id })
			.getOne();
		return findResult;
	}

	async findUserByNickname(nickname: string): Promise<Partial<User>[]> {
		const findResultList = await UserRepository.em
			.getRepository(User)
			.createQueryBuilder('user')
			.select(UserRepository.PUBLIC_INFO)
			.where('user.nickname = :nickname', { nickname })
			.getMany();
		return findResultList;
	}
}
