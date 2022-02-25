import { Connection, EntitySchema } from 'typeorm';
import { Tag, AbstractTagRepository } from './tag';

export default class TagRepository implements AbstractTagRepository {
	private static instance: AbstractTagRepository;
	private static connection: Connection;
	private static entity: EntitySchema;

	public static getInstance(connection: Connection, entity: EntitySchema): AbstractTagRepository {
		if (!TagRepository.instance) {
			TagRepository.instance = new TagRepository(connection, entity);
		}
		return TagRepository.instance;
	}

	private constructor(connection: Connection, entity: EntitySchema) {
		TagRepository.connection = connection;
		TagRepository.entity = entity;
	}

	async findTagByName(name: string): Promise<Tag[]> {
		const findResultList = await TagRepository.connection.getRepository(TagRepository.entity).find({ where: { name: name } });
		return findResultList;
	}
}
