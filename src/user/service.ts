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

	async createUser(createUserInformation: CreateUserDTO): Promise<void> {
		if (createUserInformation.loginPassword !== createUserInformation.confirmPassword)
			throw new Error(UserError.PASSWORD_NOT_MATCH.message);

		const isUserIdExist = await UserService.userRepository.isUserIdExist(createUserInformation.loginId);
		if (isUserIdExist) throw new Error(UserError.USER_ID_EXISTS.message);

		const nickname = createUserInformation.loginId;
		const { loginId, loginPassword } = createUserInformation;
		await UserService.userRepository.createUser(loginId, loginPassword, nickname);
	}

	async deleteUser(id: number): Promise<void> {
		await UserService.userRepository.deleteThumbnail(id);
	}

	async updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.updateThumbnail(userId, thumbnailUrl);
	}

	async deleteThumbnail(targetUserId: number, userId: number): Promise<void> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.deleteThumbnail(userId);
	}

	async updateUserInfomation(targetUserId: number, userId: number, updateUserInfomation: UpdateUserDTO): Promise<void> {
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
