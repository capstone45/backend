import { AbstractSubscribeService } from './type/subscribeService';
import { AbstractSubscribeRepository } from './type/subscribeRepository';

export default class SubscribeService implements AbstractSubscribeService {
	private static instance: AbstractSubscribeService;
	private static subscribeRepository: AbstractSubscribeRepository;

	public static getInstance(dependency): AbstractSubscribeService {
		if (!SubscribeService.instance) {
			SubscribeService.instance = new SubscribeService(dependency);
		}
		return SubscribeService.instance;
	}
	private constructor(dependency) {
		SubscribeService.subscribeRepository = dependency.subscribeRepository;
	}

	async changeSubscribe(userId: number, starId: number): Promise<void> {
		console.log(1);
	}
}
