import User from '../user.entity';
import Recipe from '../../recipe/recipe.entity';

export interface BasicInfomation {
	user: User;
	numberOfFans: number;
	numberOfLikes: number;
}

export interface BasicInfomationWithList extends BasicInfomation {
	likeRecipe: Partial<Recipe>[];
	subscribingUser: Partial<User>[];
}

export interface UpdateUserBody {
	nickname: string;
	loginPassword: string;
	confirmPassword: string;
	description: string;
}
