import { AbstractUserRepository, AbstractUserService } from './user';

import { BasicInfomation, BasicInfomationWithList } from './user';

export default class UserService implements AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(userRepository: AbstractUserRepository): AbstractUserService {
		if (!UserService.instance) {
			UserService.instance = new UserService(userRepository);
		}
		return UserService.instance;
	}

	private constructor(userRepository: AbstractUserRepository) {
		UserService.userRepository = userRepository;
	}

	async findById(id: number): Promise<BasicInfomationWithList> {
		const findUser = await UserService.userRepository.findById(id);
		const fans = await findUser.fans;
		const recipes = await findUser.recipes;
		const likeRecipes = await findUser.bookmarks;
		const likedRecipes = await UserService.userRepository.findBeLovedRecipe(id);
		const subscribingUsers = await findUser.stars;

		return {
			user: findUser,
			numberOfFans: fans.length,
			numberOfLikes: likedRecipes.length,
			recipes,
			likeRecipes,
			subscribingUsers,
		};
	}

	async findByNickname(nickname: string): Promise<BasicInfomation[]> {
		const findUsers = await UserService.userRepository.findByNickname(nickname);
		const UserBasicInfomation = Promise.all(
			findUsers.map(async (user) => {
				const numberOfFans = (await user.fans).length;
				const numberOfLikes = (await UserService.userRepository.findBeLovedRecipe(user.id)).length;

				return {
					user: user,
					numberOfFans,
					numberOfLikes,
				};
			})
		);

		return UserBasicInfomation;
	}
}
