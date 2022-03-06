import { AbstractSubscribeService } from './type/subscribeService';
import { AbstractUserRepository } from '../user/type/userRepository';
import { AbstractSubscribeRepository } from './type/subscribeRepository';

export default class SubscribeService implements AbstractSubscribeService {
	private static instance: AbstractSubscribeService;
	private static subscribeRepository: AbstractSubscribeRepository;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractSubscribeService {
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
