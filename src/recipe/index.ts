import express from 'express';
import { Connection } from 'typeorm';

import { AbstractRecipeController, AbstractRecipeRepository, AbstractRecipeService } from './Recipe';
import RecipeController from './recipe.controller';
import RecipeService from './recipe.service';
import RecipeRepository from './recipe.repository';

import RecipeEntity from './recipe.entity';

function recipeController(recipeService: RecipeService, app: express.Application): AbstractRecipeController {
	return RecipeController.getInstance(recipeService, app);
}

function recipeService(recipeRepository: AbstractRecipeRepository): AbstractRecipeService {
	return RecipeService.getInstance(recipeRepository);
}

function recipeRepository(connection: Connection, RecipeEntity: any): AbstractRecipeRepository {
	return RecipeRepository.getInstance(connection, RecipeEntity);
}

function initController(app: express.Application, connection: Connection) {
	recipeController(recipeService(recipeRepository(connection, RecipeEntity)), app);
}

export default initController;
