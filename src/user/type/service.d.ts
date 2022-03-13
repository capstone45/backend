import User from '../entity';

import { AbstractUserRepository } from './repository';

import { ReadUserDTO, ReadUserDetailDTO } from './type';

export abstract class AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractUserService;
	private constructor(dependency);

	findById(id: number): Promise<ReadUserDetailDTO>;
	findByNickname(nickname: string): Promise<ReadUserDTO[]>;

	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;
	updateUserInfomation(id: number, body: Partial<User>): Promise<void>;

	deleteThumbnail(id: number): Promise<void>;
}
