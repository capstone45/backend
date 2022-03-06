import { AbstractUserRepository } from '../../user/type/userRepository';
import { AbstractSubscribeRepository } from './subscribeRepository';

export abstract class AbstractSubscribeService {
	private static instance: AbstractSubscribeService;
	private static subscribeRepository: AbstractSubscribeRepository;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractSubscribeService;
	private constructor(dependency);

	changeSubscribe(userId: number, starId: number): Promise<void>;
}
