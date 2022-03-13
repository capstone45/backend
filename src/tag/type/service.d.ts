import Tag from '../entity';

import { AbstractTagRepository } from './repository';

export abstract class AbstractTagService {
	private static instance: AbstractTagService;
	private static tagRepository: AbstractTagRepository;

	public static getInstance(dependency): AbstractTagService;
	private constructor(dependency);

	findTagByName(name: string): Promise<Tag>;
}
