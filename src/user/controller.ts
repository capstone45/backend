import express, { Request, Response } from 'express';

import { AbstractUserController } from './type/controller';
import { AbstractUserService } from './type/service';

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
		UserController.router.patch('/', this.updateUserInfomation);
		UserController.router.delete('/:id/thumbnail', this.deleteThumbnail);
		UserController.router.put('/thumbnail', this.updateThumbnail);
		app.use(UserController.PATH, UserController.router);
	}

	async updateThumbnail(req: Request, res: Response): Promise<void> {
		try {
			const { userId, thumbnailUrl } = req.body;
			await UserController.userService.updateThumbnail(userId, thumbnailUrl);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async deleteThumbnail(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.body;
			await UserController.userService.deleteThumbnail(userId);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async updateUserInfomation(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.body;
			await UserController.userService.updateUserInfomation(userId, req.body);
			res.status(201).send();
		} catch (error) {
			console.log(error instanceof Error);
			res.status(400).send();
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.body;
			const findUser = await UserController.userService.findById(userId);
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
