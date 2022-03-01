import { EntityManager } from 'typeorm';
import express, { Request, Response, Router } from 'express';

import User from './user.entity';

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;

	public static getInstance(em: EntityManager): AbstractUserRepository;
	private constructor(em: EntityManager);

	findUserById(id: number): Promise<Partial<User>>;
	findUserByNickname(nickname: string): Promise<Partial<User>[]>;
}

export abstract class AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(userRepository: AbstractUserRepository): AbstractUserService;
	private constructor(userRepository: AbstractUserRepository);

	findUserById(id: number): Promise<Partial<User>>;
	findUserByNickname(nickname: string): Promise<Partial<User>[]>;
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
