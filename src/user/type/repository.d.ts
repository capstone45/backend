import { EntityManager } from 'typeorm';

import User from '../entity';

import { UpdateUserDTO } from './dto';

export abstract class AbsUserRepository {
	private static instance: AbsUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsUserRepository;
	private constructor(dependency);

	save(user: User): Promise<void>;
	isUserIdExist(loginId: string): Promise<boolean>;

	createUser(loginId: string, loginPassword: string, nickname: string): Promise<void>;
	deleteUser(id: number): Promise<void>;

	updateUserInfomation(id: number, updateUserInfomation: UpdateUserDTO): Promise<void>;
	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;

	deleteThumbnail(id: number): Promise<void>;

	findById(id: number): Promise<User>;
	findByNickname(nickname: string): Promise<User[]>;
}
