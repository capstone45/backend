import express, { Request, Response } from 'express';
import UserService from './user.service';

export default class UserController {
	private static instance: UserController;
	private static userService: UserService;
	private static readonly router = express.Router();
	private static readonly PATH = '/users';

	public static getInstance(
		userService: UserService,
		app: express.Application
	): UserController {
		if (!UserController.instance) {
			UserController.instance = new UserController(userService, app);
		}
		return UserController.instance;
	}

	private constructor(userService: UserService, app: express.Application) {
		UserController.userService = userService;
		this.initRouter(app);
	}

	private initRouter(app: express.Application): void {
		UserController.router.get('', this.getUserByNickname);
		UserController.router.get('/:id', this.getUserById);
		app.use(UserController.PATH, UserController.router);
	}

	private async getUserById(req: Request, res: Response) {
		const id = Number(req.params.id);
		const findUser = await UserController.userService.findUserById(id);
		res.send(findUser);
	}

	private async getUserByNickname(req: Request, res: Response) {
		const nickname = String(req.query.nickname);
		const findUser = await UserController.userService.findUserByNickname(
			nickname
		);
		res.send(findUser);
	}
}
