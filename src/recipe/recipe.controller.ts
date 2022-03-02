import express, { Request, Response } from 'express';
import { AbstractRecipeController, AbstractRecipeService } from './recipe';

export default class RecipeController implements AbstractRecipeController {
	private static instance: AbstractRecipeController;
	private static recipeService: AbstractRecipeService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/recipes';

	public static getInstance(RecipeService: AbstractRecipeService, app: express.Application): AbstractRecipeController {
		if (!RecipeController.instance) {
			RecipeController.instance = new RecipeController(RecipeService, app);
		}
		return RecipeController.instance;
	}

	private constructor(recipeService: AbstractRecipeService, app: express.Application) {
		RecipeController.recipeService = recipeService;
		this.initRouter(app);
	}

	initRouter(app: express.Application): void {
		if (RecipeController.instance) return;

		RecipeController.router.get('/today-most-liked', this.getByTodaysMostLiked);
		RecipeController.router.get('/latest', this.getByLatestCreated);
		RecipeController.router.get('/search', this.getByTitle);
		RecipeController.router.get('/subscribe-chef-latest', this.getBySubscribingChefsLatest);
		RecipeController.router.get('/searchss', this.getByIngredient);

		app.use(RecipeController.PATH, RecipeController.router);
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
