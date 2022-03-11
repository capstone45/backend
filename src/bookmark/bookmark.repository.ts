import { EntityManager } from 'typeorm';
import User from '../user/user.entity';

import { AbstractBookmarkRepository } from './type/bookmarkRepository';

export default class BookmarkRepository implements AbstractBookmarkRepository {
	private static instance: AbstractBookmarkRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractBookmarkRepository {
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
