import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import RecipeEntity from '../recipe/recipe.entity';
import TagEntity from '../tag/tag.entity';

@Entity({ name: 'RECIPE_HAS_TAG' })
export default class RecipeHasTag {
	@PrimaryColumn({ name: 'ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => RecipeEntity, (recipe) => recipe.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: RecipeEntity;

	@ManyToOne(() => TagEntity, (tag) => tag.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'TAG_ID' })
	tag: TagEntity;
}
