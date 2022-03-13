import express, { Request, Response } from 'express';

import { AbsRecipeController } from './type/controller';
import { AbsRecipeService } from './type/service';

export default class RecipeController implements AbsRecipeController {
	private static instance: AbsRecipeController;
	private static recipeService: AbsRecipeService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/recipes';

	public static getInstance(dependency): AbsRecipeController {
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

		RecipeController.router.get('/today-most-liked', this.getTodaysMostLiked);
		RecipeController.router.get('/latest', this.getLatestCreated);
		RecipeController.router.get('/search', this.getByTitle);
		RecipeController.router.get('/subscribe-chef-latest', this.getSubscribingChefsLatest);
		RecipeController.router.get('/:id', this.getById);
		RecipeController.router.post('/search', this.getByIngredient);
		RecipeController.router.post('/', this.createRecipe);
		RecipeController.router.put('/:id', this.updateRecipe);

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
			const { userId, recipe } = req.body;
			const recipeId = Number(req.params.id);
			RecipeController.recipeService.updateRecipe(userId, recipeId, recipe);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const recipeId = Number(req.params.id);
			const userId = req.body.userId ? req.body.userId : -1;
			const findRecipes = await RecipeController.recipeService.findById(recipeId, userId);
			res.status(200).send(findRecipes);
		} catch (error) {
			console.log(error);
			res.status(400).send();
		}
	}

	async getByTitle(req: Request, res: Response): Promise<void> {
		const title = String(req.query.title);
		const findRecipes = await RecipeController.recipeService.findByTitle(title);
		res.send(findRecipes);
	}

	async getTodaysMostLiked(req: Request, res: Response): Promise<void> {
		const findRecipes = await RecipeController.recipeService.findByTodaysMostLiked();
		res.send(findRecipes);
	}

	async getLatestCreated(req: Request, res: Response): Promise<void> {
		const findRecipes = await RecipeController.recipeService.findByLatestCreated();
		res.send(findRecipes);
	}

	async getSubscribingChefsLatest(req: Request, res: Response): Promise<void> {
		const findRecipes = await RecipeController.recipeService.findBySubscribingChefsLatest(3);
		res.send(findRecipes);
	}

	async getByIngredient(req: Request, res: Response): Promise<void> {
		const { ingredients } = req.body;
		const findRecipes = await RecipeController.recipeService.findByIngredient(ingredients);
		res.send(findRecipes);
	}
}