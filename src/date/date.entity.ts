import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Date {
	@CreateDateColumn({ name: 'CREATE_DATE' })
	createdDate: Date;
	@UpdateDateColumn({ name: 'UPDATE_DATE' })
	updatedDate: Date;
}
