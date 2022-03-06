import { EntityManager } from 'typeorm';

import Tag from './tag.entity';

import { AbstractTagRepository } from './type/tagRepository';

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

	async findTagByName(name: string): Promise<Tag> {
		const findResultList = await TagRepository.em.getRepository(Tag).find({ where: { name: name } })[0];
		return findResultList;
	}

	async findById(id: number): Promise<Tag> {
		return await TagRepository.em.getRepository(Tag).createQueryBuilder('tag').select().where('tag.id=:id', { id }).getOne();
	}
}
