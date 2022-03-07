import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';

import RecipeDescription from '../recipeDescription/recipeDescription.entity';
import RecipeIngredient from '../recipeIngredient/recipeIngredient.entity';
import RecipeTag from '../recipeTag/recipeTag.entity';
import DateInfo from '../dateInfo/dateInfo.entity';
import User from '../user/user.entity';

import { RecipeDTO } from './type/data';

export enum serving {
	DONTKNOW = 0,
	FOR1 = 1,
	FOR2 = 2,
	FOR3 = 3,
	FOR4 = 4,
	MORE5 = 5,
}

@Entity({ name: 'RECIPE' })
export default class Recipe {
	@PrimaryColumn({ name: 'RECIPE_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => User, (user) => user.recipes, { nullable: false, lazy: true })
	@JoinColumn({ name: 'USER_ID' })
	user: User;

	@OneToMany(() => RecipeDescription, (description) => description.recipe, { lazy: true, cascade: true })
	recipeDescriptions: RecipeDescription[];

	@OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, { lazy: true, cascade: true })
	recipeIngredients: RecipeIngredient[];

	@OneToMany(() => RecipeTag, (recipeTag) => recipeTag.recipe, { lazy: true, cascade: true })
	recipeTags: RecipeTag[];

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

	static create(rawRecipe: RecipeDTO, user: User): Recipe {
		const recipe = new Recipe();
		recipe.user = user;
		recipe.description = rawRecipe.description;
		recipe.thumbnailUrl = rawRecipe.thumbnailUrl;
		recipe.title = rawRecipe.title;
		recipe.referenceUrl = rawRecipe.referenceUrl;
		recipe.serving = rawRecipe.serving;
		return recipe;
	}
}
