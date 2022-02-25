import { Connection, EntitySchema } from 'typeorm';
import express, { Request, Response, Router } from 'express';

export abstract class AbstractTagRepository {
	private static instance: AbstractTagRepository;
	private static connection: Connection;
	private static entity: EntitySchema;

	public static getInstance(connection: Connection, entity: EntitySchema): AbstractTagRepository;
	private constructor(connection: Connection, entity: EntitySchema);

	findTagByName(name: string): Promise<Tag[]>;
}

export abstract class AbstractTagService {
	private static instance: AbstractTagService;
	private static tagRepository: AbstractTagRepository;

	public static getInstance(tagRepository: AbstractTagRepository): AbstractTagService;
	private constructor(tagRepository: AbstractTagRepository);

	findTagByName(name: string): Promise<Tag[]>;
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
