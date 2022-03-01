import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import Recipe from '../recipe/recipe.entity';
import Tag from '../tag/tag.entity';

@Entity({ name: 'RECIPE_TAG' })
export default class RecipeTag {
	@ManyToOne(() => Recipe, (recipe) => recipe.tags, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => Tag, (tag) => tag.recipes, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'TAG_ID' })
	tag: Tag;
}
