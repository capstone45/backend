export interface CreateRecipe {
	thumbnailUrl: string;
	referenceUrl: string;
	description: string;
	serving: number;
	tags: string[];
	title: string;
	ingredients: CreateRecipeIngredient[];
	recipeDescriptions: CreateRecipeDescription[];
}

export interface CreateRecipeIngredient {
	amount: string;
	name: string;
}

export interface CreateRecipeDescription {
	imageDescription: string;
	descriptionOrder: number;
	imageUrl: string;
}
