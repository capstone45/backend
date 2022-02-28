import { Column, Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';

import Recipe from '../recipe/recipe.entity';
import Ingredient from '../ingredient/ingredient.entity';

@Entity({ name: 'RECIPE_INGREDIENT' })
export default class RecipeIngredient {
	@PrimaryColumn({ name: 'RECIPE_INGREDIENT_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => Recipe, (recipe) => recipe.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => Ingredient, (ingredient) => ingredient.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'INGREDIENT_ID' })
	ingredient: Ingredient;

	@Column({ name: 'AMOUNT', type: 'int', nullable: false })
	amount: number;

	@Column({ name: 'SCALE', type: 'varchar', length: 10, nullable: false })
	scale: string;
}
