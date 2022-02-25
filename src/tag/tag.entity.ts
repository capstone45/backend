import { Entity, PrimaryColumn, Generated, Column, OneToMany } from 'typeorm';

import RecipeHasTag from '../entity/recipeHasTag.entity';

@Entity({ name: 'TAG' })
export default class Tag {
	@PrimaryColumn({ name: 'ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@Column({ name: 'NAME', length: 24, nullable: false })
	name: string;

	@OneToMany(() => RecipeHasTag, (recipeHasTag) => recipeHasTag.tag)
	recipeHasTags: RecipeHasTag[];
}
