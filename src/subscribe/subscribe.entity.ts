import { Entity, PrimaryColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import User from '../user/user.entity';

@Entity({ name: 'SUBSCRIBE' })
export default class Subscribe {
	@PrimaryColumn({ name: 'SUBSCRIBE,ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => User, (user) => user.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'SUBSCRIBER_ID' })
	subscriber: User;

	@ManyToOne(() => User, (user) => user.id, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'PUBLISHER_ID' })
	publisher: User;
}
