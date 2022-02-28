import { Column, Entity, PrimaryColumn, Generated } from 'typeorm';

enum category {
	CATEGORY1 = 'category1',
	CATEGORY2 = 'category2',
	CATEGORY3 = 'category3',
	CATEGORY4 = 'category4',
	CATEGORY5 = 'category5',
	ETC = 'etc',
}

@Entity({ name: 'INGREDIENT' })
export default class Ingredient {
	@PrimaryColumn({ name: 'INGREDIENT_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@Column({ name: 'NAME', type: 'varchar', length: 30, nullable: false, unique: true })
	name: string;

	@Column({ name: 'CATEGORY', type: 'enum', enum: category, nullable: false })
	category: category;
}
