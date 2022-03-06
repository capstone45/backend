import { EntityManager } from 'typeorm';
import Recipe from '../../recipe/recipe.entity';
import User from '../../user/user.entity';

import Bookmark from '../bookmark.entity';

export abstract class AbstractBookmarkRepository {
	private static instance: AbstractBookmarkRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractBookmarkRepository;
	private constructor(dependency);

	findByUser(user: User): Promise<Bookmark[]>;
	findByRecipe(recipe: Recipe): Promise<Bookmark[]>;
}
