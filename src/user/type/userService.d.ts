import User from '../user.entity';

import { AbstractUserRepository } from './userRepository';

import { PublicUserInfomation, PublicUserInfomationWithList } from './type';

export abstract class AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractUserService;
	private constructor(dependency);

	findById(id: number): Promise<PublicUserInfomationWithList>;
	findByNickname(nickname: string): Promise<PublicUserInfomation[]>;

	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;
	updateUserInfomation(id: number, body: Partial<User>): Promise<void>;

	deleteThumbnail(id: number): Promise<void>;
}
