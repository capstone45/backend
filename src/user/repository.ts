import { EntityManager } from 'typeorm';

import User from './entity';

import { AbstractUserRepository } from './type/repository';
import { UpdateUserDTO } from './type/type';

export default class UserRepository implements AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractUserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository(dependency);
		}
		return UserRepository.instance;
	}

	private constructor(dependency) {
		UserRepository.em = dependency.em;
	}

	async save(user: User): Promise<void> {
		await UserRepository.em.save(user);
	}

	async updateThumbnail(id: number, thumbnailUrl: string): Promise<void> {
		await UserRepository.em.createQueryBuilder().update(User).set({ thumbnailUrl }).where('id = :id', { id }).execute();
	}

	async deleteThumbnail(id: number): Promise<void> {
		await UserRepository.em.createQueryBuilder().update(User).set({ thumbnailUrl: 'empty' }).where('id = :id', { id }).execute();
	}

	async updateUserInfomation(id: number, updateUserInfomation: UpdateUserDTO): Promise<void> {
		const { nickname, loginPassword, description } = updateUserInfomation;
		await UserRepository.em
			.createQueryBuilder()
			.update(User)
			.set({ nickname, loginPassword, description })
			.where('id = :id', { id })
			.execute();
	}

	async findById(id: number): Promise<User> {
		return await UserRepository.em.findOne(User, id);
	}

	async findByNickname(nickname: string): Promise<User[]> {
		return await UserRepository.em.find(User, { where: { nickname } });
	}
}
