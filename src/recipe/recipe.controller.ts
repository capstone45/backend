import express, { Request, Response } from 'express';

import { AbstractRecipeController } from './type/recipeController';
import { AbstractRecipeService } from './type/recipeService';

export default class RecipeController implements AbstractRecipeController {
	private static instance: AbstractRecipeController;
	private static recipeService: AbstractRecipeService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/recipes';

	public static getInstance(dependency): AbstractRecipeController {
		if (!RecipeController.instance) {
			RecipeController.instance = new RecipeController(dependency);
		}
		return RecipeController.instance;
	}

	private constructor(dependency) {
		RecipeController.recipeService = dependency.recipeService;
		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (RecipeController.instance) return;

		RecipeController.router.get('/create', this.createRecipe);
		RecipeController.router.get('/today-most-liked', this.getByTodaysMostLiked);
		RecipeController.router.get('/latest', this.getByLatestCreated);
		RecipeController.router.get('/search', this.getByTitle);
		RecipeController.router.get('/subscribe-chef-latest', this.getBySubscribingChefsLatest);
		RecipeController.router.post('/search', this.getByIngredient);
		RecipeController.router.get('/:id', this.getById);
		RecipeController.router.post('/', this.createRecipe);
		RecipeController.router.put('/', this.updateRecipe);

		app.use(RecipeController.PATH, RecipeController.router);
	}
	// authenticate, authorize middleware 필요
	async createRecipe(req: Request, res: Response): Promise<void> {
		try {
			const { userId, recipe } = req.body;
			RecipeController.recipeService.createRecipe(userId, recipe);
			res.status(200).send();
		} catch (error) {
			res.status(400).send(error);
		}
	}

	async updateRecipe(req: Request, res: Response): Promise<void> {
		try {
			// const { userId } = req.body;
			const userId = 1;
			RecipeController.recipeService.updateRecipe(userId, req.body);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const findRecipes = await RecipeController.recipeService.findById(id);
		res.send(findRecipes);
	}

	async getByTitle(req: Request, res: Response): Promise<void> {
		const title = String(req.query.title);
		const findRecipes = await RecipeController.recipeService.findByTitle(title);
		res.send(findRecipes);
	}

	async getByTodaysMostLiked(req: Request, res: Response): Promise<void> {
		const findRecipes = await RecipeController.recipeService.findByTodaysMostLiked();
		res.send(findRecipes);
	}

	async getByLatestCreated(req: Request, res: Response): Promise<void> {
		const findRecipes = await RecipeController.recipeService.findByLatestCreated();
		res.send(findRecipes);
	}

	async getBySubscribingChefsLatest(req: Request, res: Response): Promise<void> {
		const findRecipes = await RecipeController.recipeService.findBySubscribingChefsLatest(3);
		res.send(findRecipes);
	}

	async getByIngredient(req: Request, res: Response): Promise<void> {
		const body = { args1: 'ingr1', args2: 'ingr2', args3: 'ingr3' };
		const keywords = Object.values(body);
		const findRecipes = await RecipeController.recipeService.findByIngredient(keywords);
		res.send(findRecipes);
	}
}
