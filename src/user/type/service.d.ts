import { AbsUserRepository } from './repository';

import { ReadUserDTO, ReadUserDetailDTO, UpdateUserDTO, CreateUserDTO } from './dto';

export abstract class AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService;
	private constructor(dependency);

	createUser(createUserInformation: CreateUserDTO): Promise<void | Error>;
	deleteUser(id: number): Promise<void | Error>;

	findById(id: number): Promise<ReadUserDetailDTO | Error>;
	findByNickname(nickname: string): Promise<ReadUserDTO[] | Error>;

	updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void | Error>;
	updateUserInfomation(targetUserId: number, userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error>;

	deleteThumbnail(targetUserId: number, userId: number): Promise<void | Error>;
}
