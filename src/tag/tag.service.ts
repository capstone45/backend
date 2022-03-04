import { AbstractTagRepository, AbstractTagService, Tag } from './tag';

export default class TagService implements AbstractTagService {
	private static instance: AbstractTagService;
	private static tagRepository: AbstractTagRepository;

	public static getInstance(dependency): AbstractTagService {
		if (!TagService.instance) {
			TagService.instance = new TagService(dependency);
		}
		return TagService.instance;
	}

	private constructor(dependency) {
		TagService.tagRepository = dependency.tagRepository;
	}

	async findTagByName(name: string): Promise<Partial<Tag>[]> {
		const findTagList = await TagService.tagRepository.findTagByName(name);
		return findTagList;
	}
}
