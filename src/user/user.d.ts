import { EntityManager } from 'typeorm';
import express, { Request, Response, Router } from 'express';

import User from './user.entity';
import Recipe from '../recipe/recipe.entity';

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractUserRepository;
	private constructor(dependency);

	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;
	deleteThumbnail(id: number): Promise<void>;
	updateById(id: number, body: UpdateUserBody): Promise<void>;
	findById(id: number): Promise<User>;
	findByNickname(nickname: string): Promise<Partial<User>[]>;
	findBeLovedRecipe(id: number): Promise<Partial<Recipe>[]>;
}

export abstract class AbstractUserService {
	private static instance: AbstractUserService;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractUserService;
	private constructor(dependency);

	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;
	deleteThumbnail(id: number): Promise<void>;
	updateById(id: number, body: UpdateUserBody): Promise<void>;
	findById(id: number): Promise<BasicInfomationWithList>;
	findByNickname(nickname: string): Promise<BasicInfomation[]>;
}

export abstract class AbstractUserController {
	private static instance: AbstractUserController;
	private static userService: AbstractUserService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbstractUserController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	updateThumbnail(req: Request, res: Response): Promise<void>;
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

export interface UpdateUserBody {
	nickname: string;
	loginPassword: string;
	confirmPassword: string;
	description: string;
}
