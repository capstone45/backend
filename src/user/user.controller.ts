import express, { Request, Response } from 'express';

import { AbstractUserController } from './type/userController';
import { AbstractUserService } from './type/userService';

export default class UserController implements AbstractUserController {
	private static instance: AbstractUserController;
	private static userService: AbstractUserService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/users';

	public static getInstance(dependency): AbstractUserController {
		if (!UserController.instance) {
			UserController.instance = new UserController(dependency);
		}
		return UserController.instance;
	}

	private constructor(dependency) {
		UserController.userService = dependency.userService;
		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (UserController.instance) return;

		UserController.router.get('/search', this.getByNickname);
		UserController.router.get('/:id', this.getById);
		UserController.router.patch('/:id', this.updateById);
		UserController.router.delete('/:id/thumbnail', this.deleteThumbnail);
		UserController.router.patch('/:id/thumbnail', this.updateThumbnail);
		app.use(UserController.PATH, UserController.router);
	}

	async updateThumbnail(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id);
			const { thumbnailUrl } = req.body;
			await UserController.userService.updateThumbnail(id, thumbnailUrl);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async deleteThumbnail(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id);
			await UserController.userService.deleteThumbnail(id);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async updateById(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id);
			await UserController.userService.updateById(id, req.body);
			res.status(201).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id);
			const findUser = await UserController.userService.findById(id);
			res.status(200).send(findUser);
		} catch (error) {
			res.status(400).send();
		}
	}

	async getByNickname(req: Request, res: Response): Promise<void> {
		const nickname = String(req.query.nickname);
		const findUsers = await UserController.userService.findByNickname(nickname);
		res.send(findUsers);
	}
}
