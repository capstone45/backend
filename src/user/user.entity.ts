import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';

import { Date } from '../entity/date.entity';
import RecipeEntity from '../recipe/recipe.entity';
import Bookmark from '../entity/bookmark.entity';

export enum loginMethod {
	LOCAL = 'local',
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	KAKAO = 'kakao',
	NAVER = 'naver',
}

export enum grade {
	LEVEL1 = 1,
	LEVEL2 = 2,
	LEVEL3 = 3,
	LEVEL4 = 4,
	LEVEL5 = 5,
}

@Entity({ name: 'USER' })
export default class UserEntity extends Date {
	@PrimaryColumn({ name: 'ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@OneToMany(
		() => RecipeEntity,
		(recipe) => {
			recipe.id;
		}
	)
	recipes: RecipeEntity[];

	@OneToMany(() => Bookmark, (bookmark) => bookmark.recipe)
	bookmarks: Bookmark[];

	@Column({
		name: 'LOGIN_ID',
		type: 'varchar',
		length: 20,
		nullable: false,
		unique: true,
	})
	loginId: string;

	@Column({ name: 'LOGIN_PASSWORD', type: 'varchar', length: 30, nullable: false })
	loginPassword: string;

	@Column({ name: 'LOGIN_METHOD', type: 'enum', enum: loginMethod, nullable: false })
	loginMethod: loginMethod;

	@Column({ name: 'NICKNAME', type: 'varchar', length: 30, nullable: false, unique: true })
	nickname: string;

	@Column({ name: 'THUMBNAIL_URL', type: 'varchar', length: 2048, nullable: false })
	thumbnail: string;

	@Column({
		name: 'DESCRIPTION',
		type: 'varchar',
		default: '안녕하세요!',
		length: 900,
		nullable: false,
	})
	description: string;

	@Column({ name: 'GRADE', type: 'enum', enum: grade, default: grade.LEVEL1 })
	grade: grade;
}
