import { AbsUserRepository } from './repository';

import { ReadUserDTO, ReadUserDetailDTO, UpdateUserDTO, CreateUserDTO, BaseUserDTO ,LogInUserDTO } from './dto';

export abstract class AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService;
	private constructor(dependency);

	bcryptPassword(loginPassword: string): Promise<string>;
	comparePassword(loginPassword:string, confirmPassword: string): Promise<boolean>;

	signIn(createUserInformation: CreateUserDTO): Promise<BaseUserDTO | Error>;
	signOut(userId: number): Promise<void | Error>;

	logIn(logInUserInformation: LogInUserDTO): Promise<string | Error>;
	auth(token: string): Promise< User | Error>;

	findById(id: number): Promise<ReadUserDetailDTO | Error>;
	findByNickname(nickname: string): Promise<ReadUserDTO[] | Error>;

	updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void | Error>;
	updateUserInfomation(targetUserId: number, userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error>;

	deleteThumbnail(targetUserId: number, userId: number): Promise<void | Error>;
}
