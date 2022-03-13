import { AbsSubscribeService } from './type/service';
import { AbsUserRepository } from '../user/type/repository';
import { AbsSubscribeRepository } from './type/repository';

export default class SubscribeService implements AbsSubscribeService {
	private static instance: AbsSubscribeService;
	private static subscribeRepository: AbsSubscribeRepository;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsSubscribeService {
		if (!SubscribeService.instance) {
			SubscribeService.instance = new SubscribeService(dependency);
		}
		return SubscribeService.instance;
	}
	private constructor(dependency) {
		SubscribeService.subscribeRepository = dependency.subscribeRepository;
		SubscribeService.userRepository = dependency.userRepository;
	}

	async changeSubscribe(userId: number, starId: number): Promise<void> {
		const user = await SubscribeService.userRepository.findById(userId);
		const star = await SubscribeService.userRepository.findById(starId);

		const index = (await user.stars).findIndex((subscribedUser) => (subscribedUser.id = starId));
		if (index === -1) {
			(await user.stars).push(star);
			star.numberOfFan++;
		} else {
			(await user.stars).splice(index, 1);
			star.numberOfFan--;
		}

		await SubscribeService.subscribeRepository.changeSubscribe(user, star);
	}
}
