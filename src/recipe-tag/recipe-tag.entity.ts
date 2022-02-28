import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import Recipe from '../recipe/recipe.entity';
import Tag from '../tag/tag.entity';

@Entity({ name: 'RECIPE_TAG' })
export default class RecipeTag {
	@PrimaryColumn({ name: 'RECIPE_TAG_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => Recipe, (recipe) => recipe.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => Tag, (tag) => tag.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'TAG_ID' })
	tag: Tag;
}
