import Recipe from '../../recipe/recipe.entity';
import User from '../user.entity';

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
