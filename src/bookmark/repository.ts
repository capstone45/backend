import { EntityManager } from 'typeorm';

import Recipe from '../recipe/entity';
import User from '../user/entity';
import Bookmark from './entity';

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

	async findByUser(user: User): Promise<Bookmark[]> {
		return await BookmarkRepository.em.find(Bookmark, { where: { user } });
	}
	async findByRecipe(recipe: Recipe): Promise<Bookmark[]> {
		return await BookmarkRepository.em.find(Bookmark, { where: { recipe } });
	}

	async checkBookmark(recipeId: number, userId: number): Promise<boolean> {
		const bookmark = await BookmarkRepository.em
			.getRepository(Bookmark)
			.createQueryBuilder('bookmark')
			.select()
			.where('bookmark.user = :user', { user: userId })
			.andWhere('bookmark.user = :recipe', { recipe: recipeId })
			.execute();
		return bookmark ? true : false;
	}
}
