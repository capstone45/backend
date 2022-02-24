import { Connection } from 'typeorm';
import UserRepository from './user.repository';

export type User = {
	id: number;
	loginId: string;
	loginPassword: string;
	loginMethod: string;
	nickname: string;
	hasThumbnail: boolean;
	joinDate: Date;
	description: string;
	grade: number;
};

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static connection: Connection;

	public static getInstance(connection: Connection): AbstractUserRepository;
	private constructor(connection: Connection);

	findUserById(id: number): Promise<User>;
	findUserByNickname(nickname: string): Promise<User[]>;
}
