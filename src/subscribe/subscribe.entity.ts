import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import UserEntity from '../user/user.entity';

@Entity({ name: 'SUBSCRIBE' })
export default class Subscribe {
	@PrimaryColumn({ name: 'ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => UserEntity, (user) => user.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'SUBSCRIBER_ID' })
	subscriber: UserEntity;

	@ManyToOne(() => UserEntity, (user) => user.id, { lazy: true, nullable: false })
	@JoinColumn({ name: 'PUBLISHER_ID' })
	publisher: UserEntity;
}
