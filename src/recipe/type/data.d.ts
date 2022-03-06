export class CreateRecipeDto {
	readonly thumbnailUrl: string;
	readonly referenceUrl: string;
	readonly description: string;
	readonly serving: number;
	readonly tags: string[];
	readonly title: string;
	readonly ingredients: CreateRecipeDtoIngredient[];
	readonly recipeDescriptions: CreateRecipeDtoRecipeDescription[];
}

export interface CreateRecipeDtoIngredient {
	amount: string;
	name: string;
}

export interface CreateRecipeDtoRecipeDescription {
	imageDescription: string;
	descriptionOrder: number;
	imageUrl: string;
}
