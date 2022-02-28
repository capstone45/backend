import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import User from '../user/user.entity';
import Recipe from '../recipe/recipe.entity';

@Entity({ name: 'BOOKMARK' })
export default class Bookmark {
	@PrimaryColumn({ name: 'BOOKMARK_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => Recipe, (recipe) => recipe.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => User, (user) => user.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'USER_ID' })
	user: User;
}
