import User from './entity';
import { UpdateUserDTO, ReadUserDetailDTO, ReadUserDTO, CreateUserDTO } from './type/dto';
import UserError from './type/error';
import { AbsUserRepository } from './type/repository';
import { AbsUserService } from './type/service';

export default class UserService implements AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService {
		if (!UserService.instance) {
			UserService.instance = new UserService(dependency);
		}
		return UserService.instance;
	}

	private constructor(dependency) {
		UserService.userRepository = dependency.userRepository;
	}

	async signIn(createUserInformation: CreateUserDTO): Promise<number | Error> {
		if (createUserInformation.loginPassword !== createUserInformation.confirmPassword)
			throw new Error(UserError.PASSWORD_NOT_MATCH.message);

		const findUser = await UserService.userRepository.findByLoginId(createUserInformation.loginId);
		if (findUser) throw new Error(UserError.USER_ID_EXISTS.message);

		const newUser = User.create(createUserInformation);
		await UserService.userRepository.save(newUser);

		return await newUser.id;
	}

	async signOut(userId: number): Promise<void | Error> {
		const user = await UserService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		await UserService.userRepository.remove(user);
	}

	async updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void | Error> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.updateThumbnail(userId, thumbnailUrl);
	}

	async deleteThumbnail(targetUserId: number, userId: number): Promise<void> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.deleteThumbnail(userId);
	}

	async updateUserInfomation(targetUserId: number, userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error> {
		const { loginPassword, confirmPassword } = updateUserInfomation;
		if (loginPassword !== confirmPassword) throw new Error(UserError.PASSWORD_NOT_MATCH.message);
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		const user = await UserService.userRepository.findById(targetUserId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		user.nickname = updateUserInfomation.nickname;
		user.loginPassword = updateUserInfomation.loginPassword;
		user.description = updateUserInfomation.description;

		await UserService.userRepository.save(user);
	}

	async findById(id: number): Promise<ReadUserDetailDTO | Error> {
		const user = await UserService.userRepository.findById(id);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		const likeRecipe = await user.bookmarks;
		const subscribingUser = await user.stars;

		return new ReadUserDetailDTO(user, likeRecipe, subscribingUser);
	}

	async findByNickname(nickname: string): Promise<ReadUserDTO[] | Error> {
		const users = await UserService.userRepository.findByNickname(nickname);

		return users.length === 0 ? [] : await Promise.all(users.map(async (user) => new ReadUserDTO(user)));
	}
}
