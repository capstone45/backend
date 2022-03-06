import Tag from '../tag.entity';

import { AbstractTagRepository } from './tagRepository';

export abstract class AbstractTagService {
	private static instance: AbstractTagService;
	private static tagRepository: AbstractTagRepository;

	public static getInstance(dependency): AbstractTagService;
	private constructor(dependency);

	findTagByName(name: string): Promise<Tag>;
}
