import Tag from './tag.entity';

import { AbstractTagRepository } from './type/tagRepository';
import { AbstractTagService } from './type/tagService';

export default class TagService implements AbstractTagService {
	private static tagRepository: AbstractTagRepository;
	private static instance: AbstractTagService;

	public static getInstance(dependency): AbstractTagService {
		if (!TagService.instance) {
			TagService.instance = new TagService(dependency);
		}
		return TagService.instance;
	}

	private constructor(dependency) {
		TagService.tagRepository = dependency.tagRepository;
	}

	async findTagByName(name: string): Promise<Tag> {
		const findTagList = await TagService.tagRepository.findTagByName(name);
		return findTagList;
	}
}
