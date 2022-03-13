import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import User from '../user/entity';
import Recipe from '../recipe/entity';

@Entity({ name: 'BOOKMARK' })
export default class Bookmark {
	@ManyToOne(() => Recipe, (recipe) => recipe.id, { lazy: false, nullable: false, primary: true })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => User, (user) => user.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'USER_ID' })
	user: User;
}
