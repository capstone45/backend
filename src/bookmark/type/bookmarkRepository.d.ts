import { EntityManager } from 'typeorm';
import User from '../../user/user.entity';

export abstract class AbstractBookmarkRepository {
	private static instance: AbstractBookmarkRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractBookmarkRepository;
	private constructor(dependency);

	changeBookmark(userOfLikedRecipe: User, user: User): Promise<void>;
}
