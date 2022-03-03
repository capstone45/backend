import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class DateInfo {
	constructor() {
		this.createdDate = new Date();
		this.updatedDate = new Date();
	}

	@CreateDateColumn({ name: 'CREATE_DATE' })
	createdDate: Date;
	@UpdateDateColumn({ name: 'UPDATE_DATE' })
	updatedDate: Date;
}
