import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';

import { Date } from '../entity/date.entity';
import Description from '../recipe-description/recipe-description.entity';
import RecipeIngredient from '../recipe-ingredient/recipe-ingredient.entity';
import RecipeTag from '../recipe-tag/recipe-tag.entity';
import User from '../user/user.entity';

enum serving {
	DONTKNOW = 0,
	FOR1 = 1,
	FOR2 = 2,
	FOR3 = 3,
	FOR4 = 4,
	MORE5 = 5,
}

@Entity({ name: 'RECIPE' })
export default class Recipe extends Date {
	@PrimaryColumn({ name: 'RECIPE_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => User, (user) => user.recipes, { nullable: false, lazy: true })
	@JoinColumn({ name: 'USER_ID' })
	user: User;

	@OneToMany(() => Description, (description) => description.recipe, { lazy: true })
	descriptions: Description[];

	@OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, { lazy: true })
	ingredients: RecipeIngredient[];

	@OneToMany(() => RecipeTag, (recipeTag) => recipeTag.recipe, { lazy: true })
	tags: RecipeTag[];

	@Column({ name: 'THUMBNAIL_URL', type: 'varchar', length: 2048, nullable: false })
	thumbnailUrl: string;

	@Column({ name: 'TITLE', type: 'varchar', length: 90, nullable: false })
	title: string;

	@Column({ name: 'REFERENCE_URL', type: 'varchar', length: 2048, nullable: false })
	referenceUrl: string;

	@Column({ name: 'SERVING', type: 'enum', enum: serving, nullable: false })
	serving: serving;
}
