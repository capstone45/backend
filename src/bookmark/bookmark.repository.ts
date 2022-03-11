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

	async findOne(recipeId: number, userId: number): Promise<Bookmark> {
		const bookmark = await BookmarkRepository.em
			.getRepository(Bookmark)
			.createQueryBuilder('bookmark')
			.select()
			.where('bookmark.user = :user', { user: userId })
			.andWhere('bookmark.recipe = :recipe', { recipe: recipeId })
			.execute();
		return bookmark;
	}

	async changeBookmark(userOfLikedRecipe: User, user: User, bookmark: Bookmark, isNew: boolean): Promise<void> {
		await BookmarkRepository.em.transaction(async (txem) => {
			await txem.getRepository(User).save(userOfLikedRecipe);
			await txem.getRepository(User).save(user);
			if (isNew) await txem.getRepository(Bookmark).save(bookmark);
			else await BookmarkRepository.delete(bookmark);
		});
	}

	static async delete(bookmark: Bookmark): Promise<void> {
		await BookmarkRepository.em.getRepository(Bookmark).remove(bookmark);
	}
}
