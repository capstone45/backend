import { AbstractRecipeRepository, AbstractRecipeService, Recipe } from './recipe';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static RecipeRepository: AbstractRecipeRepository;

	public static getInstance(RecipeRepository: AbstractRecipeRepository): AbstractRecipeService {
		if (!RecipeService.instance) {
			RecipeService.instance = new RecipeService(RecipeRepository);
		}
		return RecipeService.instance;
	}

	private constructor(RecipeRepository: AbstractRecipeRepository) {
		RecipeService.RecipeRepository = RecipeRepository;
	}

	async findRecipeByTitle(title: string): Promise<Recipe[]> {
		const findRecipeList = await RecipeService.RecipeRepository.findRecipeByTitle(title);
		return findRecipeList;
	}
}
