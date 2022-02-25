import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Date {
	@CreateDateColumn({ name: 'CREATE_DATE' })
	createDate: Date;
	@UpdateDateColumn({ name: 'UPDATE_DATE' })
	updateDate: Date;
}
