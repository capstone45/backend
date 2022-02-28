import { Column, Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';

import RecipeEntity from '../recipe/recipe.entity';
import IngredientEntity from '../ingredient/ingredient.entity';

@Entity({ name: 'RECIPE_HAS_INGREDIENT' })
export default class RecipeHasIngredient {
	@PrimaryColumn({ name: 'ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => RecipeEntity, (recipe) => recipe.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: RecipeEntity;

	@ManyToOne(() => IngredientEntity, (ingredient) => ingredient.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'INGREDIENT_ID' })
	ingredient: IngredientEntity;

	@Column({ name: 'AMOUNT', type: 'int', nullable: false })
	amount: number;

	@Column({ name: 'SCALE', type: 'varchar', length: 10, nullable: false })
	scale: string;
}
