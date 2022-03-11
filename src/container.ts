import { getManager } from 'typeorm';

import User from './user/user.entity';
import Tag from './tag/tag.entity';
import Recipe from './recipe/recipe.entity';
import RecipeTag from './recipeTag/recipeTag.entity';
import RecipeIngredient from './recipeIngredient/recipeIngredient.entity';
import RecipeDescription from './recipeDescription/recipeDescription.entity';
import Ingredient from './ingredient/ingredient.entity';
import DateInfo from './dateInfo/dateInfo.entity';
import Bookmark from './bookmark/bookmark.entity';

import UserController from './user/user.controller';
import UserService from './user/user.service';
import UserRepository from './user/user.repository';

import TagController from './tag/tag.controller';
import TagService from './tag/tag.service';
import TagRepository from './tag/tag.repository';

import RecipeController from './recipe/recipe.controller';
import RecipeService from './recipe/recipe.service';
import RecipeRepository from './recipe/recipe.repository';

import subscribeRepository from './subscribe/subscribe.repository';
import SubscribeService from './subscribe/subscribe.service';
import SubscribeController from './subscribe/subscribe.controller';

import IngredientRepository from './ingredient/ingredient.repository';
import RecipeTagRepository from './recipeTag/recipeTag.repository';
import RecipeIngredientRepository from './recipeIngredient/recipeIngredient.repository';

import BookmarkRepository from './bookmark/bookmark.repository';
import BookmarkService from './bookmark/bookmark.service';
import BookmarkController from './bookmark/bookmark.controller';

export default class Container {
	private static isInitialzied = false;
	private static readonly bean = {
		Entity: {},
		Controller: {},
		Service: {},
		Repository: {},
	};

	static getBean(layer: layer, domain: domain) {
		return Container.bean[layer][domain];
	}

	static initContainer(app: Express.Application) {
		if (Container.isInitialzied) return;
		Container.initEntity();
		Container.initRepository();
		Container.initService();
		Container.initController(app);
		Container.isInitialzied = true;
	}

	private static initEntity() {
		Container.bean[layer.ENTITY][domain.USER] = User;
		Container.bean[layer.ENTITY][domain.TAG] = Tag;
		Container.bean[layer.ENTITY][domain.RECIPE] = Recipe;
		Container.bean[layer.ENTITY][domain.RECIPE_TAG] = RecipeTag;
		Container.bean[layer.ENTITY][domain.RECIPE_INGREDIENT] = RecipeIngredient;
		Container.bean[layer.ENTITY][domain.RECIPE_DESCRIPTION] = RecipeDescription;
		Container.bean[layer.ENTITY][domain.INGREDIENT] = Ingredient;
		Container.bean[layer.ENTITY][domain.DATEINFO] = DateInfo;
		Container.bean[layer.ENTITY][domain.BOOKMARK] = Bookmark;
	}

	private static initController(app) {
		const commonDependency = { app };
		Container.bean[layer.CONTROLLER][domain.USER] = UserController.getInstance({
			...commonDependency,
			userService: Container.getBean(layer.SERVICE, domain.USER),
		});
		Container.bean[layer.CONTROLLER][domain.TAG] = TagController.getInstance({
			...commonDependency,
			tagService: Container.getBean(layer.SERVICE, domain.TAG),
		});
		Container.bean[layer.CONTROLLER][domain.RECIPE] = RecipeController.getInstance({
			...commonDependency,
			recipeService: Container.getBean(layer.SERVICE, domain.RECIPE),
		});
		//Container.bean[layer.CONTROLLER][domain.RECIPE_TAG] =
		//Container.bean[layer.CONTROLLER][domain.RECIPE_INGREDIENT] =
		//Container.bean[layer.CONTROLLER][domain.RECIPE_DESCRIPTION] =
		//Container.bean[layer.CONTROLLER][domain.INGREDIENT] =
		//Container.bean[layer.CONTROLLER][domain.DATEINFO] =
		Container.bean[layer.CONTROLLER][domain.BOOKMARK] = BookmarkController.getInstance({
			...commonDependency,
			bookmarkService: Container.getBean(layer.SERVICE, domain.BOOKMARK),
		});
		Container.bean[layer.CONTROLLER][domain.SUBSCRIBE] = SubscribeController.getInstance({
			...commonDependency,
			subscribeService: Container.getBean(layer.SERVICE, domain.SUBSCRIBE),
		});
	}

	private static initService() {
		Container.bean[layer.SERVICE][domain.USER] = UserService.getInstance({
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
		});
		Container.bean[layer.SERVICE][domain.TAG] = TagService.getInstance({
			tagRepository: Container.getBean(layer.REPOSITORY, domain.TAG),
		});
		Container.bean[layer.SERVICE][domain.RECIPE] = RecipeService.getInstance({
			recipeRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE),
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
			tagRepository: Container.getBean(layer.REPOSITORY, domain.TAG),
			ingredientRepository: Container.getBean(layer.REPOSITORY, domain.INGREDIENT),
			recipeTagRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE_TAG),
			recipeIngredientRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE_INGREDIENT),
			bookmarkRepository: Container.getBean(layer.REPOSITORY, domain.BOOKMARK),
		});
		//Container.bean[layer.SERVICE][domain.RECIPE_TAG] =
		//Container.bean[layer.SERVICE][domain.RECIPE_INGREDIENT] =
		//Container.bean[layer.SERVICE][domain.RECIPE_DESCRIPTION] =
		//Container.bean[layer.SERVICE][domain.INGREDIENT] =
		//Container.bean[layer.SERVICE][domain.DATEINFO] =
		Container.bean[layer.SERVICE][domain.BOOKMARK] = BookmarkService.getInstance({
			bookmarkRepository: Container.getBean(layer.REPOSITORY, domain.BOOKMARK),
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
			recipeRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE),
		});
		Container.bean[layer.SERVICE][domain.SUBSCRIBE] = SubscribeService.getInstance({
			subscribeRepository: Container.getBean(layer.REPOSITORY, domain.SUBSCRIBE),
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
		});
	}

	private static initRepository() {
		const commonDependency = { em: getManager() };
		Container.bean[layer.REPOSITORY][domain.USER] = UserRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.TAG] = TagRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.RECIPE] = RecipeRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.RECIPE_TAG] = RecipeTagRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.RECIPE_INGREDIENT] = RecipeIngredientRepository.getInstance({ ...commonDependency });
		//Container.bean[layer.REPOSITORY][domain.RECIPE_DESCRIPTION] =
		Container.bean[layer.REPOSITORY][domain.INGREDIENT] = IngredientRepository.getInstance({ ...commonDependency });
		//Container.bean[layer.REPOSITORY][domain.DATEINFO] =
		Container.bean[layer.REPOSITORY][domain.BOOKMARK] = BookmarkRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.SUBSCRIBE] = subscribeRepository.getInstance({ ...commonDependency });
	}
}

export enum layer {
	ENTITY = 'Entity',
	CONTROLLER = 'Controller',
	SERVICE = 'Service',
	REPOSITORY = 'Repository',
}

export enum domain {
	USER = 'User',
	TAG = 'Tag',
	RECIPE = 'Recipe',
	RECIPE_TAG = 'RecipeTag',
	RECIPE_INGREDIENT = 'RecipeIngredient',
	RECIPE_DESCRIPTION = 'RecipeDescription',
	INGREDIENT = 'Ingredient',
	DATEINFO = 'DateInfo',
	BOOKMARK = 'Bookmark',
	SUBSCRIBE = 'Subscribe',
}
