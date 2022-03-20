import Recipe from '../../recipe/entity';
import User from '../entity';

export class BaseUserDTO {
	readonly id: number;
	readonly nickname: string;
	readonly thumbnailUrl: string;

	constructor(id: number, nickname: string, thumbnailUrl: string) {
		this.id = id;
		this.nickname = nickname;
		this.thumbnailUrl = thumbnailUrl;
	}
}

export class ReadUserDTO extends BaseUserDTO {
	readonly description: string;
	readonly grade: string;
	readonly numberOfFan: number;
	readonly numberOfLike: number;

	constructor(user: User) {
		super(user.id, user.nickname, user.thumbnailUrl);
		this.description = user.description;
		this.numberOfLike = user.numberOfLike;
		this.numberOfFan = user.numberOfFan;
	}
}

export class ReadUserDetailDTO extends ReadUserDTO {
	readonly likeRecipe: Recipe[];
	readonly subscribingUser: User[];

	constructor(user: User, likeRecipe: Recipe[], subscribingUser: User[]) {
		super(user);
		this.likeRecipe = likeRecipe;
		this.subscribingUser = subscribingUser;
	}
}

export class UpdateUserDTO {
	readonly nickname: string;
	readonly loginPassword: string;
	readonly confirmPassword: string;
	readonly description: string;
}

export class CreateUserDTO {
	readonly loginId: string;
	readonly loginPassword: string;
	readonly confirmPassword: string;
}
