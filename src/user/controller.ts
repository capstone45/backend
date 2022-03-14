import express, { Request, Response } from 'express';

import { AbsUserController } from './type/controller';
import UserError from './type/error';
import { AbsUserService } from './type/service';

export default class UserController implements AbsUserController {
	private static instance: AbsUserController;
	private static userService: AbsUserService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/users';

	public static getInstance(dependency): AbsUserController {
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
		UserController.router.patch('/:id', this.updateUserInfomation);
		UserController.router.delete('/:id/thumbnail', this.deleteThumbnail);
		UserController.router.put('/:id/thumbnail', this.updateThumbnail);
		app.use(UserController.PATH, UserController.router);
	}

	async updateThumbnail(req: Request, res: Response): Promise<void> {
		try {
			const targetUserId = Number(req.params.id);
			const { userId, thumbnailUrl } = req.body;

			await UserController.userService.updateThumbnail(targetUserId, userId, thumbnailUrl);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED:
					res.status(401).send();
					return;
				default:
					res.status(400).send();
					return;
			}
		}
	}

	async deleteThumbnail(req: Request, res: Response): Promise<void> {
		try {
			const targetUserId = Number(req.params.id);
			const { userId } = req.body;

			await UserController.userService.deleteThumbnail(targetUserId, userId);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED:
					res.status(401).send();
					return;
				default:
					res.status(400).send();
					return;
			}
		}
	}

	async updateUserInfomation(req: Request, res: Response): Promise<void> {
		try {
			const targetUserId = Number(req.params.id);
			const { userId, updateUserInfomation } = req.body;

			await UserController.userService.updateUserInfomation(targetUserId, userId, updateUserInfomation);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED:
					res.status(401).send();
					return;
				case UserError.PASSWORD_NOT_MATCH:
					res.status(403).send();
					return;
				default:
					res.status(400).send();
					return;
			}
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const targetUserId = Number(req.params.id);
			const findUser = await UserController.userService.findById(targetUserId);

			res.status(200).send(findUser);
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND:
					res.status(404).send();
					return;
				default:
					res.status(400).send();
					return;
			}
		}
	}

	async getByNickname(req: Request, res: Response): Promise<void> {
		try {
			const nickname = String(req.query.nickname);
			const findUsers = await UserController.userService.findByNickname(nickname);

			res.status(200).send(findUsers);
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND:
					res.status(404).send();
					return;
				default:
					res.status(400).send();
					return;
			}
		}
	}
}
