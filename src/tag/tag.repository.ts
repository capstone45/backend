import { EntityManager } from 'typeorm';

import { AbstractTagRepository } from './type/tagRepository';

import Tag from './tag.entity';

export default class TagRepository implements AbstractTagRepository {
	private static instance: AbstractTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractTagRepository {
		if (!TagRepository.instance) {
			TagRepository.instance = new TagRepository(dependency);
		}
		return TagRepository.instance;
	}

	private constructor(dependency) {
		TagRepository.em = dependency.em;
	}

	async findTagByName(name: string): Promise<Partial<Tag>[]> {
		const findResultList = await TagRepository.em.getRepository(Tag).find({ where: { name: name } });
		return findResultList;
	}

	async create(rawTag: Tag): Promise<number> {
		const tag = await TagRepository.em
			.createQueryBuilder()
			.insert()
			.into(Tag)
			.values([
				{
					name: rawTag.name,
					recipes: rawTag.recipes,
				},
			])
			.execute();
		return Number(tag.identifiers[0].id);
	}

	async findById(id: number): Promise<Tag> {
		return await TagRepository.em.getRepository(Tag).createQueryBuilder('tag').select().where('tag.id=:id', { id }).getOne();
	}
}
