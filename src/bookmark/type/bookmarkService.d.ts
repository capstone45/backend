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

	changeBookmark(recipeId: number, userId: number): Promise<void>;
}
