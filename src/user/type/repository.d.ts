import { EntityManager } from 'typeorm';

import User from '../entity';

import { UpdateUserDTO } from './type';

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractUserRepository;
	private constructor(dependency);

	save(user: User): Promise<void>;

	updateUserInfomation(id: number, updateUserInfomation: UpdateUserDTO): Promise<void>;
	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;

	deleteThumbnail(id: number): Promise<void>;

	findById(id: number): Promise<User>;
	findByNickname(nickname: string): Promise<User[]>;
}
