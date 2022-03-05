import { Entity, ManyToOne, Column } from 'typeorm';
import Recipe from '../recipe/recipe.entity';

@Entity({ name: 'RECIPE_DESCRIPTION' })
export default class RecipeDescription {
	@ManyToOne(() => Recipe, (recipe) => recipe.recipeDescriptions, { lazy: true, primary: true })
	recipe: Recipe;

	@Column({ name: 'IMAGE_DESCRIPTION', type: 'varchar', length: 900, nullable: false })
	imageDescription: string;

	@Column({ name: 'IMAGE_URL', type: 'varchar', length: 2048, nullable: false })
	imageUrl: string;

	@Column({ name: 'DESCRIPTION_ORDER', type: 'smallint', nullable: false })
	descriptionOrder: number;
}
