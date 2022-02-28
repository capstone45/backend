import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn, Column } from 'typeorm';
import Recipe from '../recipe/recipe.entity';

@Entity({ name: 'RECIPE_DESCRIPTION' })
export default class Description {
	@PrimaryColumn({ name: 'RECIPE_DESCRIPTION_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => Recipe, (recipe) => recipe.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@Column({ name: 'IMAGE_URL', type: 'varchar', length: 2048, nullable: false })
	imageUrl: string;

	@Column({ name: 'DESCRIPTION_ORDER', type: 'smallint', nullable: false })
	descriptionOrder: number;
}
