import { EntityManager } from 'typeorm';

import { AbstractSubscribeRepository } from './type/subscribeRepository';

export default class subscribeRepository implements AbstractSubscribeRepository {
	private static instance: AbstractSubscribeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractSubscribeRepository {
		if (!subscribeRepository.instance) {
			subscribeRepository.instance = new subscribeRepository(dependency);
		}
		return subscribeRepository.instance;
	}
	private constructor(dependency) {
		subscribeRepository.em = dependency.em;
	}
}
