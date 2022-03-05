import { AbstractTagRepository } from './tagRepository';
import { Tag } from './data';

export abstract class AbstractTagService {
	private static instance: AbstractTagService;
	private static tagRepository: AbstractTagRepository;

	public static getInstance(dependency): AbstractTagService;
	private constructor(dependency);

	findTagByName(name: string): Promise<Partial<Tag>[]>;
}
