import Bookmark from './bookmark.entity';

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
		return BookmarkService.instance; // Singleton
	}

	private constructor(dependency) {
		BookmarkService.bookmarkRepository = dependency.bookmarkRepository;
		BookmarkService.userRepository = dependency.userRepository;
		BookmarkService.recipeRepository = dependency.recipeRepository;
	}

	async findByUser(userId: number): Promise<Bookmark[]> {
		const user = await BookmarkService.userRepository.findById(userId);
		const findBookmarks = await BookmarkService.bookmarkRepository.findByUser(user);
		return findBookmarks;
	}

	async findByRecipe(recipeId: number): Promise<Bookmark[]> {
		const recipe = await BookmarkService.recipeRepository.findById(recipeId);
		const findBookmarks = await BookmarkService.bookmarkRepository.findByRecipe(recipe);
		return findBookmarks;
	}

	async checkBookmark(recipeId: number, userId: number): Promise<boolean> {
		const bookmark = await BookmarkService.bookmarkRepository.findOne(recipeId, userId);
		return bookmark ? true : false;
	}

	async changeBookmark(recipeId: number, userId: number): Promise<void> {
		// 그런 북마크가 있으면 -> 취소
		// 그런 북마크가 없으면 -> 생성 => 찾은 유저의

		// 레시피 찾기
		const recipe = await BookmarkService.recipeRepository.findById(recipeId);
		const userOfLikedRecipe = await recipe.user;

		// 유저 찾기
		const user = await BookmarkService.userRepository.findById(userId);

		// 찾은 레시피, 찾은 유저로 구성된 북마크 찾기 & 없으면 만들기
		let bookmark = await BookmarkService.bookmarkRepository.findOne(recipeId, userId);
		let isNew = false;

		if (!bookmark) {
			bookmark = Bookmark.create(recipe, user);
			isNew = true;
			(await user.bookmarks).push(bookmark);
			userOfLikedRecipe.numberOfLike++;
		} else {
			const index = (await user.bookmarks).findIndex((bookmark) => (bookmark.recipe = recipe));
			(await user.bookmarks).splice(index, 1);
			userOfLikedRecipe.numberOfLike--;
		}
		await BookmarkService.bookmarkRepository.changeBookmark(userOfLikedRecipe, user, bookmark, isNew);
	}
}
