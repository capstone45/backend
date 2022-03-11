import Bookmark from '../bookmark.entity';

import { AbstractUserRepository } from '../../user/type/userRepository';
import { AbstractRecipeRepository } from '../../recipe/type/recipeRepository';
import { AbstractBookmarkRepository } from './bookmarkRepository';

export abstract class AbstractBookmarkService {
	private static instance: AbstractBookmarkService;
	private static bookmarkRepository: AbstractBookmarkRepository;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractBookmarkService;
	private constructor(dependency);

	findByUser(userId: number): Promise<Bookmark[]>;
	findByRecipe(recipeId: number): Promise<Bookmark[]>;
	checkBookmark(recipeId: number, userId: number): Promise<boolean>;
	changeBookmark(recipeId: number, userId: number): Promise<void>;
}
