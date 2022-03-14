import { AbsUserRepository } from './repository';

import { ReadUserDTO, ReadUserDetailDTO, UpdateUserDTO } from './dto';

export abstract class AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService;
	private constructor(dependency);

	findById(id: number): Promise<ReadUserDetailDTO>;
	findByNickname(nickname: string): Promise<ReadUserDTO[]>;

	updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void>;
	updateUserInfomation(targetUserId: number, userId: number, updateUserInfomation: UpdateUserDTO): Promise<void>;

	deleteThumbnail(targetUserId: number, userId: number): Promise<void>;
}
