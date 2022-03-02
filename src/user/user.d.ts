import { EntityManager } from 'typeorm';
import express, { Request, Response, Router } from 'express';

import User from './user.entity';
import Recipe from '../recipe/recipe.entity';

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;

	public static getInstance(em: EntityManager): AbstractUserRepository;
	private constructor(em: EntityManager);

	deleteThumbnail(id: number): Promise<void>;
	updateById(id: number, body: UpdateBody): Promise<void>;
	findById(id: number): Promise<Partial<User>>;
	findByNickname(nickname: string): Promise<Partial<User>[]>;
	findBeLovedRecipe(id: number): Promise<Partial<Recipe>[]>;
}

export abstract class AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(userRepository: AbstractUserRepository): AbstractUserService;
	private constructor(userRepository: AbstractUserRepository);

	deleteThumbnail(id: number): Promise<void>;
	updateById(id: number, body: UpdateBody): Promise<void>;
	findById(id: number): Promise<BasicInfomationWithList>;
	findByNickname(nickname: string): Promise<BasicInfomation[]>;
}

export abstract class AbstractUserController {
	private static instance: AbstractUserController;
	private static userService: AbstractUserService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(userService: AbstractUserService, app: express.Application): AbstractUserController;
	private constructor(userService: AbstractUserService, app: express.Application);
	initRouter(app: express.Application): void;

	deleteThumbnail(req: Request, res: Response): Promise<void>;
	updateById(req: Request, res: Response): Promise<void>;
	getById(req: Request, res: Response): Promise<void>;
	getByNickname(req: Request, res: Response): Promise<void>;
}

export interface BasicInfomation {
	user: Partial<User>;
	numberOfFans: number;
	numberOfLikes: number;
}

export interface BasicInfomationWithList extends BasicInfomation {
	recipes: Partial<Recipe>[];
	likeRecipes: Partial<Recipe>[];
	subscribingUsers: Partial<User>[];
}

export interface UpdateBody {
	nickname: string;
	loginPassword: string;
	confirmPassword: string;
	description: string;
}
