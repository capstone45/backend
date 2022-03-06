import User from '../user.entity';

import { AbstractUserRepository } from './userRepository';
import { BasicInfomation, BasicInfomationWithList } from './data';

export abstract class AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractUserService;
	private constructor(dependency);

	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;
	deleteThumbnail(id: number): Promise<void>;
	updateById(id: number, body: Partial<User>): Promise<void>;
	findById(id: number): Promise<BasicInfomationWithList>;
	findByNickname(nickname: string): Promise<BasicInfomation[]>;
}
