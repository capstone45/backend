import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import User from '../user/user.entity';

@Entity({ name: 'SUBSCRIBE' })
export default class Subscribe {
	@ManyToOne(() => User, (user) => user.subscribers, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'SUBSCRIBER_ID' })
	subscriber: User;

	@ManyToOne(() => User, (user) => user.publishers, { lazy: true, nullable: false, primary: true })
	@JoinColumn({ name: 'PUBLISHER_ID' })
	publisher: User;
}
