import Recipe from '../recipe/recipe.entity';

import { AbstractBookmarkService } from './type/bookmarkService';
import { AbstractUserRepository } from '../user/type/userRepository';
import { AbstractRecipeRepository } from '../recipe/type/recipeRepository';
import { AbstractBookmarkRepository } from './type/bookmarkRepository';

export default class BookmarkService implements AbstractBookmarkService {
	private static instance: AbstractBookmarkService;
	private static bookmarkRepository: AbstractBookmarkRepository;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractBookmarkService {
		if (!BookmarkService.instance) {
			BookmarkService.instance = new BookmarkService(dependency);
		}
		return BookmarkService.instance;
	}

	private constructor(dependency) {
		BookmarkService.bookmarkRepository = dependency.bookmarkRepository;
		BookmarkService.userRepository = dependency.userRepository;
		BookmarkService.recipeRepository = dependency.recipeRepository;
	}

	async changeBookmark(recipeId: number, userId: number): Promise<void> {
		const user = await BookmarkService.userRepository.findById(userId);
		const bookmarks = await user.bookmarks;

		const recipe = await BookmarkService.recipeRepository.findById(recipeId);
		const recipeUser = await recipe.user;

		const [doesInclude, index] = BookmarkService.include(bookmarks, recipe);

		if (doesInclude) {
			bookmarks.splice(index, 1);
			recipeUser.numberOfLike--;
		} else {
			bookmarks.push(recipe);
			recipeUser.numberOfLike++;
		}

		await BookmarkService.bookmarkRepository.changeBookmark(recipeUser, user);
	}

	private static include(bookmark: Recipe[], recipe: Recipe): [boolean, number] {
		let returnIndex = 0;
		return bookmark.filter((bookmarkedRecipe, index) => {
			if (bookmarkedRecipe.id === recipe.id) {
				returnIndex = index;
				return bookmarkedRecipe;
			}
		}).length !== 0
			? [true, returnIndex]
			: [false, returnIndex];
	}
}
