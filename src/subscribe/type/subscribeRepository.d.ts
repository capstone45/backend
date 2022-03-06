import { EntityManager } from 'typeorm';

import User from '../../user/user.entity';

export abstract class AbstractSubscribeRepository {
	private static instance: AbstractSubscribeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractSubscribeRepository;
	private constructor(dependency);

	changeSubscribe(user: User, star: User): Promise<void>;
}
