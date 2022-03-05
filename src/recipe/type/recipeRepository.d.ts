import { EntityManager } from 'typeorm';

import Recipe from '../recipe.entity';
import User from '../../user/user.entity';

export abstract class AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeRepository;
	private constructor(dependency);

	create(user: User, body: Partial<Recipe>): Promise<void>;
	findById(id: number): Promise<Partial<Recipe>>;
	findByTitle(title: string): Promise<Partial<Recipe>[]>;
	findByTodaysMostLiked(): Promise<Partial<Recipe>[]>;
	findByLatestCreated(): Promise<Partial<Recipe>[]>;
	findBySubscribingChefsLatest(id: number): Promise<Partial<Recipe>[]>;
	findAll(): Promise<Partial<Recipe>[]>;
}
