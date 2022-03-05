import { EntityManager } from 'typeorm';

import { Tag } from './data';

export abstract class AbstractTagRepository {
	private static instance: AbstractTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractTagRepository;
	private constructor(dependency);

	create(tag: Tag): Promise<number>;
	findTagByName(name: string): Promise<Partial<Tag>[]>;
	findById(id: number): Promise<Tag>;
}
