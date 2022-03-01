import { EntityManager } from 'typeorm';

import { AbstractUserRepository } from './user';
import User from './user.entity';
import Recipe from '../recipe/recipe.entity';
import Bookmark from '../bookmark/bookmark.entity';

export default class UserRepository implements AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;
	private static PUBLIC_USER_INFO = ['user.id', 'user.nickname', 'user.thumbnailUrl', 'user.description', 'user.grade'];

	public static getInstance(em: EntityManager): AbstractUserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository(em);
		}
		return UserRepository.instance;
	}

	private constructor(em: EntityManager) {
		UserRepository.em = em;
	}

	async findById(id: number): Promise<Partial<User>> {
		const findResult = await UserRepository.em
			.getRepository(User)
			.createQueryBuilder('user')
			.select(UserRepository.PUBLIC_USER_INFO)
			.where('user.id=:id', { id })
			.getOne();
		return findResult;
	}

	async findByNickname(nickname: string): Promise<Partial<User>[]> {
		const findResultList = await UserRepository.em
			.getRepository(User)
			.createQueryBuilder('user')
			.select(UserRepository.PUBLIC_USER_INFO)
			.where('user.nickname = :nickname', { nickname })
			.getMany();
		return findResultList;
	}

	// 좋아요가 눌린 내 Recipe 검색
	async findBeLovedRecipe(id: number): Promise<Partial<Recipe>[]> {
		const findRecipes = await UserRepository.em
			.getRepository(Bookmark)
			.createQueryBuilder('bookmark')
			.select(['recipe'])
			.innerJoin('bookmark.recipe', 'recipe')
			.where('recipe.user = :id', { id })
			.execute();
		return findRecipes;
	}
}
