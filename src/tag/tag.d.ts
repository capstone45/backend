import { EntityManager } from 'typeorm';
import express, { Request, Response, Router } from 'express';

export abstract class AbstractTagRepository {
	private static instance: AbstractTagRepository;
	private static em: EntityManager;

	public static getInstance(em: EntityManager): AbstractTagRepository;
	private constructor(em: EntityManager);

	create(tag: Tag): Promise<number>;
	findTagByName(name: string): Promise<Partial<Tag>[]>;
	findById(id: number): Promise<Tag>;
}

export abstract class AbstractTagService {
	private static instance: AbstractTagService;
	private static tagRepository: AbstractTagRepository;

	public static getInstance(tagRepository: AbstractTagRepository): AbstractTagService;
	private constructor(tagRepository: AbstractTagRepository);

	findTagByName(name: string): Promise<Partial<Tag>[]>;
}

export abstract class AbstractTagController {
	private static instance: AbstractTagController;
	private static tagService: AbstractTagService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(tagService: AbstractTagService, app: express.Application): AbstractTagController;
	private constructor(tagService: AbstractTagService, app: express.Application);
	initRouter(app: express.Application): void;

	getTagByName(req: Request, res: Response): Promise<void>;
}

export type Tag = {
	id: number;
	name: string;
};
