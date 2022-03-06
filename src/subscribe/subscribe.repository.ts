import { EntityManager } from 'typeorm';
import User from '../user/user.entity';

import { AbstractSubscribeRepository } from './type/subscribeRepository';

export default class SubscribeRepository implements AbstractSubscribeRepository {
	private static instance: AbstractSubscribeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractSubscribeRepository {
		if (!SubscribeRepository.instance) {
			SubscribeRepository.instance = new SubscribeRepository(dependency);
		}
		return SubscribeRepository.instance;
	}
	private constructor(dependency) {
		SubscribeRepository.em = dependency.em;
	}

	async changeSubscribe(user: User, star: User): Promise<void> {
		await SubscribeRepository.em.transaction(async (txem) => {
			await txem.getRepository(User).save(user);
			await txem.getRepository(User).save(star);
		});
	}
}
