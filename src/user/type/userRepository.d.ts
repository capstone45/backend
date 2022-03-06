import { EntityManager } from 'typeorm';

import User from '../user.entity';

import { UpdateUserInfomation } from './type';

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractUserRepository;
	private constructor(dependency);

	updateUserInfomation(id: number, updateUserInfomation: UpdateUserInfomation): Promise<void>;
	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;

	deleteThumbnail(id: number): Promise<void>;

	findById(id: number): Promise<User>;
	findByNickname(nickname: string): Promise<User[]>;
}
