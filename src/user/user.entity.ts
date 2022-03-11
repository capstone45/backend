import { Column, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

import DateInfo from '../dateInfo/dateInfo.entity';
import Recipe from '../recipe/recipe.entity';

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
export default class User {
	@PrimaryColumn({ name: 'USER_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@OneToMany(() => Recipe, (recipe) => recipe.user, { lazy: true })
	recipes: Promise<Recipe[]>;

	@ManyToMany(() => Recipe, (recipe) => recipe.likeUsers, { lazy: true, nullable: false })
	@JoinTable({ name: 'BOOKMARK', joinColumn: { name: 'RECIPE_ID' }, inverseJoinColumn: { name: 'USER_ID' } })
	bookmarks: Recipe[];

	// 나를 구독하는 사람들
	@ManyToMany(() => User, (user) => user.stars, { lazy: true, nullable: false })
	@JoinTable({ name: 'SUBSCRIBE', joinColumn: { name: 'STAR_ID' }, inverseJoinColumn: { name: 'FAN_ID' } })
	fans: User[];

	// 내가 구독하는 사람들
	@ManyToMany(() => User, (user) => user.fans, { lazy: true, nullable: false })
	stars: User[];

	@Column(() => DateInfo, { prefix: false })
	date: DateInfo;

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
	thumbnailUrl: string;

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

	@Column({ name: 'NUMBER_OF_LIKE', type: 'int', default: 0, nullable: false, unsigned: true })
	numberOfLike: number;

	@Column({ name: 'NUMBER_OF_FAN', type: 'int', default: 0, nullable: false, unsigned: true })
	numberOfFan: number;
}
