import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export default class User {
	@PrimaryColumn({ type: 'bigint' })
	@Generated('increment')
	id: number;

	@Column({
		type: 'varchar',
		name: 'login_id',
		nullable: false,
		length: 20,
		unique: true,
	})
	loginId: string;

	@Column({ name: 'login_password', nullable: false })
	loginPassword: string;

	@Column({ name: 'login_method', nullable: false })
	loginMethod: string;

	@Column({ name: 'nickname', nullable: false, length: 24, unique: true })
	nickname: string;

	@Column({ name: 'has_thumbnail' })
	hasThumbnail: boolean;

	@Column({ type: 'date', name: 'join_date', nullable: false })
	joinDate: Date;

	@Column({
		name: 'description',
		nullable: false,
		default: '안녕하세요!',
		length: 900,
	})
	description: string;

	@Column({ name: 'grade', nullable: false })
	grade: number;
}
