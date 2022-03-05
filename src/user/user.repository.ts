import { EntityManager } from 'typeorm';

import { UpdateUserBody } from './type/data';
import { AbstractUserRepository } from './type/userRepository';
import User from './user.entity';
import Recipe from '../recipe/recipe.entity';
import Bookmark from '../bookmark/bookmark.entity';

export default class UserRepository implements AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;
	private static PUBLIC_USER_INFO = ['user.id', 'user.nickname', 'user.thumbnailUrl', 'user.description', 'user.grade'];

	public static getInstance(dependency): AbstractUserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository(dependency);
		}
		return UserRepository.instance;
	}

	private constructor(dependency) {
		UserRepository.em = dependency.em;
	}

	async updateThumbnail(id: number, thumbnailUrl: string): Promise<void> {
		await UserRepository.em.createQueryBuilder().update(User).set({ thumbnailUrl }).where('id = :id', { id }).execute();
	}

	async deleteThumbnail(id: number): Promise<void> {
		await UserRepository.em.createQueryBuilder().update(User).set({ thumbnailUrl: 'empty' }).where('id = :id', { id }).execute();
	}

	async updateById(id: number, body: UpdateUserBody): Promise<void> {
		await UserRepository.em
			.createQueryBuilder()
			.update(User)
			.set({ nickname: body.nickname, loginPassword: body.loginPassword, description: body.description })
			.where('id = :id', { id })
			.execute();
	}

	async findById(id: number): Promise<User> {
		const findResult = await UserRepository.em
			.getRepository(User)
			.createQueryBuilder('user')
			.select(UserRepository.PUBLIC_USER_INFO)
			.where('user.id=:id', { id })
			.getOne();
		return findResult;
	}

	async findByNickname(nickname: string): Promise<User[]> {
		const findResultList = await UserRepository.em
			.getRepository(User)
			.createQueryBuilder('user')
			.select()
			.where('user.nickname = :nickname', { nickname })
			.getMany();
		return findResultList;
	}

	// 좋아요가 눌린 내 Recipe 검색
	async findBeLovedRecipe(id: number): Promise<Recipe[]> {
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
