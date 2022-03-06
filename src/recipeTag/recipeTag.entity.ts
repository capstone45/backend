import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import Recipe from '../recipe/recipe.entity';
import Tag from '../tag/tag.entity';

@Entity({ name: 'RECIPE_TAG' })
export default class RecipeTag {
	@ManyToOne(() => Recipe, (recipe) => recipe.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => Tag, (tag) => tag.id, { lazy: true, nullable: false, primary: true, cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'TAG_ID' })
	tag: Tag;

	static create(recipe: Recipe, tag: Tag) {
		const recipeTag = new RecipeTag();
		recipeTag.recipe = recipe;
		recipeTag.tag = tag;
		return recipeTag;
	}
}
