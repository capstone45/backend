import { AbstractTagRepository, AbstractTagService, Tag } from './tag';

export default class TagService implements AbstractTagService {
	private static instance: AbstractTagService;
	private static tagRepository: AbstractTagRepository;

	public static getInstance(tagRepository: AbstractTagRepository): AbstractTagService {
		if (!TagService.instance) {
			TagService.instance = new TagService(tagRepository);
		}
		return TagService.instance;
	}

	private constructor(TagRepository: AbstractTagRepository) {
		TagService.tagRepository = TagRepository;
	}

	async findTagByName(name: string): Promise<Partial<Tag>[]> {
		const findTagList = await TagService.tagRepository.findTagByName(name);
		return findTagList;
	}
}
