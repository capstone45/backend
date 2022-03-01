import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Generated } from 'typeorm';

import Recipe from '../recipe/recipe.entity';
import Ingredient from '../ingredient/ingredient.entity';

@Entity({ name: 'RECIPE_INGREDIENT' })
export default class RecipeIngredient {
	@ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { lazy: true, primary: true })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => Ingredient, (ingredient) => ingredient.id, { lazy: true, primary: true })
	@JoinColumn({ name: 'INGREDIENT_ID' })
	ingredient: Ingredient;

	@Column({ name: 'AMOUNT', type: 'int', nullable: false })
	amount: number;

	@Column({ name: 'SCALE', type: 'varchar', length: 10, nullable: false })
	scale: string;
}
