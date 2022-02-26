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

		RecipeController.router.get('/todaysMostLiked', this.getTodaysMostLikedRecipe);
		RecipeController.router.get('/latest', this.getLatestCreatedRecipe);
		RecipeController.router.get('/:title', this.getRecipeByTitle);

		app.use(RecipeController.PATH, RecipeController.router);
	}

	async getRecipeByTitle(req: Request, res: Response): Promise<void> {
		const title = String(req.params.title);
		const findRecipeList = await RecipeController.recipeService.findRecipeByTitle(title);
		res.send(findRecipeList);
	}

	async getTodaysMostLikedRecipe(req: Request, res: Response): Promise<void> {
		const findRecipeList = await RecipeController.recipeService.findTodaysMostLikedRecipe();
		res.send(findRecipeList);
	}

	async getLatestCreatedRecipe(req: Request, res: Response): Promise<void> {
		const findRecipeList = await RecipeController.recipeService.findLatestCreatedRecipe();
		res.send(findRecipeList);
	}
}
