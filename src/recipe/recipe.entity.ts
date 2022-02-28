import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import Bookmark from '../bookmark/bookmark.entity';

import { Date } from '../date/date.entity';
import RecipeHasTag from '../recipe-has-tag/recipeHasTag.entity';
import UserEntity from '../user/user.entity';

enum serving {
	DONTKNOW = 0,
	FOR1 = 1,
	FOR2 = 2,
	FOR3 = 3,
	FOR4 = 4,
	MORE5 = 5,
}

@Entity({ name: 'RECIPE' })
export default class RecipeEntity extends Date {
	@PrimaryColumn({ name: 'ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(
		() => UserEntity,
		(user) => {
			user.recipes;
		},
		{ nullable: false, lazy: true }
	)
	@JoinColumn({ name: 'USER_ID', referencedColumnName: 'id' })
	user: UserEntity;

	@OneToMany(() => RecipeHasTag, (recipeHasTag) => recipeHasTag.recipe)
	recipeHasTags: RecipeHasTag[];

	@OneToMany(() => Bookmark, (bookmark) => bookmark.recipe)
	bookmarks: Bookmark[];

	@Column({ name: 'THUMBNAIL_URL', type: 'varchar', length: 2048, nullable: false })
	thumbnailUrl: string;

	@Column({ name: 'TITLE', type: 'varchar', length: 90, nullable: false })
	title: string;

	@Column({ name: 'REFERENCE_URL', type: 'varchar', length: 2048, nullable: false })
	referenceUrl: string;

	@Column({ name: 'SERVING', type: 'enum', enum: serving, nullable: false })
	serving: serving;
}
