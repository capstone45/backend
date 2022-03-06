import Recipe from '../../recipe/recipe.entity';
import User from '../user.entity';

export class PublicUserInfomation {
	readonly id: number;
	readonly nickname: string;
	readonly thumbnailUrl: string;
	readonly description: string;
	readonly grade: string;
	readonly numberOfFan: number;
	readonly numberOfLike: number;

	constructor(user: User) {
		this.id = user.id;
		this.nickname = user.nickname;
		this.thumbnailUrl = user.thumbnailUrl;
		this.description = user.description;
		this.numberOfLike = user.numberOfLike;
		this.numberOfFan = user.numberOfFan;
	}
}

export class PublicUserInfomationWithList extends PublicUserInfomation {
	readonly likeRecipe: Recipe[];
	readonly subscribingUser: User[];

	constructor(user: User, likeRecipe: Recipe[], subscribingUser: User[]) {
		super(user);
		this.likeRecipe = likeRecipe;
		this.subscribingUser = subscribingUser;
	}
}

export class UpdateUserInfomation {
	readonly nickname: string;
	readonly loginPassword: string;
	readonly confirmPassword: string;
	readonly description: string;
}
