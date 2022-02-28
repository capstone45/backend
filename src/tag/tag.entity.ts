import { Entity, PrimaryColumn, Generated, Column, OneToMany } from 'typeorm';

import RecipeTag from '../recipe-tag/recipe-tag.entity';

@Entity({ name: 'TAG' })
export default class Tag {
	@PrimaryColumn({ name: 'TAG_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@Column({ name: 'NAME', length: 24, nullable: false })
	name: string;

	@OneToMany(() => RecipeTag, (recipeTag) => recipeTag.tag, { lazy: true })
	recipeTags: RecipeTag[];
}
