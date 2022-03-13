import { EntityManager } from 'typeorm';
import Recipe from '../../recipe/entity';
import User from '../../user/entity';

import Bookmark from '../entity';

export abstract class AbsBookmarkRepository {
	private static instance: AbsBookmarkRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsBookmarkRepository;
	private constructor(dependency);

	findByUser(user: User): Promise<Bookmark[]>;
	findByRecipe(recipe: Recipe): Promise<Bookmark[]>;
	checkBookmark(recipeId: number, userId: number): Promise<boolean>;
}
