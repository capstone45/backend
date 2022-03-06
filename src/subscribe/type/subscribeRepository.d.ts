import { EntityManager } from 'typeorm';

export abstract class AbstractSubscribeRepository {
	private static instance: AbstractSubscribeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractSubscribeRepository;
	private constructor(dependency);
}
