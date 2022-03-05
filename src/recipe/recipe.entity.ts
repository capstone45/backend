import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn, Column, OneToMany, BaseEntity } from 'typeorm';

import DateInfo from '../entity/dateInfo.entity';
import RecipeDescription from '../recipe-description/recipe-description.entity';
import RecipeIngredient from '../recipe-ingredient/recipe-ingredient.entity';
import RecipeTag from '../recipe-tag/recipe-tag.entity';
import User from '../user/user.entity';

export enum serving {
	DONTKNOW = 0,
	FOR1 = 1,
	FOR2 = 2,
	FOR3 = 3,
	FOR4 = 4,
	MORE5 = 5,
}

@Entity({ name: 'RECIPE' })
export default class Recipe extends BaseEntity {
	@PrimaryColumn({ name: 'RECIPE_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => User, (user) => user.recipes, { nullable: false, lazy: true })
	@JoinColumn({ name: 'USER_ID' })
	user: User;

	@OneToMany(() => RecipeDescription, (description) => description.recipe, { lazy: true })
	recipeDescriptions: RecipeDescription[];

	@OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, { lazy: true })
	ingredients: RecipeIngredient[];

	@OneToMany(() => RecipeTag, (recipeTag) => recipeTag.recipe, { lazy: true, cascade: ['insert', 'update'] })
	tags: RecipeTag[];

	@Column(() => DateInfo, { prefix: false })
	date: DateInfo;

	@Column({ name: 'DESCRIPTION', type: 'varchar', length: 450, nullable: false })
	description: string;

	@Column({ name: 'THUMBNAIL_URL', type: 'varchar', length: 2048, nullable: false })
	thumbnailUrl: string;

	@Column({ name: 'TITLE', type: 'varchar', length: 90, nullable: false })
	title: string;

	@Column({ name: 'REFERENCE_URL', type: 'varchar', length: 2048, nullable: false })
	referenceUrl: string;

	@Column({ name: 'SERVING', type: 'enum', enum: serving, nullable: false })
	serving: serving;
}
