import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import UserEntity from '../user/user.entity';
import RecipeEntity from '../recipe/recipe.entity';

@Entity({ name: 'BOOKMARK' })
export default class Bookmark {
	@PrimaryColumn({ name: 'ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => RecipeEntity, (recipe) => recipe.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: RecipeEntity;

	@ManyToOne(() => UserEntity, (user) => user.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'USER_ID' })
	user: UserEntity;
}
