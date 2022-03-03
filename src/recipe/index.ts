import express from 'express';
import { EntityManager } from 'typeorm';

import { AbstractRecipeController, AbstractRecipeRepository, AbstractRecipeService } from './Recipe';
import RecipeController from './recipe.controller';
import RecipeService from './recipe.service';
import RecipeRepository from './recipe.repository';
import UserRepository from '../user/user.repository';

function recipeController(recipeService: RecipeService, app: express.Application): AbstractRecipeController {
	return RecipeController.getInstance(recipeService, app);
}

function recipeService(recipeRepository: AbstractRecipeRepository, em: EntityManager): AbstractRecipeService {
	return RecipeService.getInstance(recipeRepository, UserRepository.getInstance(em));
}

function recipeRepository(em: EntityManager): AbstractRecipeRepository {
	return RecipeRepository.getInstance(em);
}

function initController(app: express.Application, em: EntityManager) {
	recipeController(recipeService(recipeRepository(em), em), app);
}

export default initController;
