import { UpdateUserDTO, ReadUserDetailDTO, ReadUserDTO } from './type/dto';
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

	async updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED);

		await UserService.userRepository.updateThumbnail(userId, thumbnailUrl);
	}

	async deleteThumbnail(targetUserId: number, userId: number): Promise<void> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED);

		await UserService.userRepository.deleteThumbnail(userId);
	}

	async updateUserInfomation(id: number, updateUserInfomation: UpdateUserDTO): Promise<void> {
		const { loginPassword, confirmPassword } = updateUserInfomation;
		if (loginPassword !== confirmPassword) {
			throw new Error('비밀번호가 다릅니다');
		}
		// password 암호화 필요
		await UserService.userRepository.updateUserInfomation(id, updateUserInfomation);
	}

	async findById(id: number): Promise<ReadUserDetailDTO> {
		const user = await UserService.userRepository.findById(id);
		const likeRecipe = await user.bookmarks;
		const subscribingUser = await user.stars;

		return new ReadUserDetailDTO(user, likeRecipe, subscribingUser);
	}

	async findByNickname(nickname: string): Promise<ReadUserDTO[]> {
		const users = await UserService.userRepository.findByNickname(nickname);
		return await Promise.all(users.map(async (user) => new ReadUserDTO(user)));
	}
}
