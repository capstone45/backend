import { AbsUserRepository } from './repository';

import { ReadUserDTO, ReadUserDetailDTO, UpdateUserDTO, CreateUserDTO, BaseUserDTO, LogInUserDTO } from './dto';

export abstract class AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService;
	private constructor(dependency);

	checkIsValidEmail(email: string): Promise<boolean>;

	bcryptPassword(loginPassword: string): Promise<string>;
	comparePassword(loginPassword: string, confirmPassword: string): Promise<boolean>;

	signup(createUserInformation: CreateUserDTO): Promise<BaseUserDTO | Error>;
	signOut(userId: number): Promise<void | Error>;

	logIn(logInUserInformation: LogInUserDTO): Promise<string | Error>;
	auth(token: string): Promise<number | Error>;

	findById(id: number): Promise<ReadUserDetailDTO | Error>;
	findByNickname(nickname: string): Promise<ReadUserDTO[] | Error>;
	getTodayChef(): Promise<BaseUserDTO[] | Error>;

	updateThumbnail(userId: number, thumbnailUrl: string): Promise<void | Error>;
	updateUserInfomation(userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error>;

	deleteThumbnail(userId: number): Promise<void | Error>;
}
