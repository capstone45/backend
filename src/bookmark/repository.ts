import { EntityManager } from 'typeorm';

import User from '../user/entity';

import { AbsBookmarkRepository } from './type/repository';

export default class BookmarkRepository implements AbsBookmarkRepository {
	private static instance: AbsBookmarkRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsBookmarkRepository {
		if (!BookmarkRepository.instance) {
			BookmarkRepository.instance = new BookmarkRepository(dependency);
		}
		return BookmarkRepository.instance;
	}

	private constructor(dependency) {
		BookmarkRepository.em = dependency.em;
	}

	async changeBookmark(recipeUser: User, user: User): Promise<void> {
		await BookmarkRepository.em.transaction(async (txem) => {
			await txem.getRepository(User).save(recipeUser);
			await txem.getRepository(User).save(user);
		});
	}
}
