import { Connection, EntitySchema } from 'typeorm';
import express, { Request, Response, Router } from 'express';

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static connection: Connection;
	private static entity: EntitySchema;

	public static getInstance(connection: Connection, entity: EntitySchema): AbstractUserRepository;
	private constructor(connection: Connection, entity: EntitySchema);

	findUserById(id: number): Promise<User>;
	findUserByNickname(nickname: string): Promise<User[]>;
}

export abstract class AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(userRepository: AbstractUserRepository): AbstractUserService;
	private constructor(userRepository: AbstractUserRepository);

	findUserById(id: number): Promise<User>;
	findUserByNickname(nickname: string): Promise<User[]>;
}

export abstract class AbstractUserController {
	private static instance: AbstractUserController;
	private static userService: AbstractUserService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(userService: AbstractUserService, app: express.Application): AbstractUserController;
	private constructor(userService: AbstractUserService, app: express.Application);
	initRouter(app: express.Application): void;

	getUserById(req: Request, res: Response): Promise<void>;
	getUserByNickname(req: Request, res: Response): Promise<void>;
}

export type User = {
	id: number;
	loginId: string;
	loginPassword: string;
	loginMethod: string;
	nickname: string;
	thumbnailUrl: string;
	description: string;
	grade: number;
	createdDate: Date;
	updatedDate: Date;
};
