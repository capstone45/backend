import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Ingredient from '../ingredient/entity';
import User from '../user/entity';

@Entity({ name: 'USER_INGREDIENT' })
export default class UserIngredient {
	@ManyToOne(() => User, (user) => user.ingredients, { primary: true, eager: true })
	@JoinColumn({ name: 'USER_ID' })
	user: User;

	@ManyToOne(() => Ingredient, (ingredient) => ingredient.user, { primary: true, eager: true })
	@JoinColumn({ name: 'INGREDIENT_ID' })
	ingredient: Ingredient;

	@Column({ name: 'COUNT', type: 'bigint', nullable: false, default: 0 })
	count: number;
}
