import { Column, Entity, PrimaryColumn, Generated } from 'typeorm';

import { CreateRecipeDtoIngredient } from '../recipe/type/data';

@Entity({ name: 'INGREDIENT' })
export default class Ingredient {
	@PrimaryColumn({ name: 'INGREDIENT_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@Column({ name: 'NAME', type: 'varchar', length: 30, nullable: false, unique: true })
	name: string;

	static create(rawIngredient: CreateRecipeDtoIngredient): Ingredient {
		const ingredient = new Ingredient();
		ingredient.name = rawIngredient.name;
		return ingredient;
	}
}
