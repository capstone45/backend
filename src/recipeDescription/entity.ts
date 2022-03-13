import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';

import Recipe from '../recipe/entity';

import { ModifyRecipeDescriptionDTO } from './type/type';

@Entity({ name: 'RECIPE_DESCRIPTION' })
export default class RecipeDescription {
	@ManyToOne(() => Recipe, (recipe) => recipe.recipeDescriptions, { lazy: true, primary: true })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@Column({ name: 'IMAGE_DESCRIPTION', type: 'varchar', length: 900, nullable: false })
	imageDescription: string;

	@Column({ name: 'IMAGE_URL', type: 'varchar', length: 2048, nullable: false })
	imageUrl: string;

	@Column({ name: 'DESCRIPTION_ORDER', type: 'smallint', nullable: false })
	descriptionOrder: number;

	static create(recipe: Recipe, rawRecipeDescription: ModifyRecipeDescriptionDTO): RecipeDescription {
		const recipeDescription = new RecipeDescription();
		recipeDescription.recipe = recipe;
		recipeDescription.imageDescription = rawRecipeDescription.imageDescription;
		recipeDescription.imageUrl = rawRecipeDescription.imageUrl;
		recipeDescription.descriptionOrder = rawRecipeDescription.descriptionOrder;
		return recipeDescription;
	}
}
