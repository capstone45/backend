import { EntityManager } from 'typeorm';
import Recipe from '../recipe/recipe.entity';
import User from '../user/user.entity';
import Bookmark from './bookmark.entity';

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
