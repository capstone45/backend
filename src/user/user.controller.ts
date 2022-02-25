import express, { Request, Response } from 'express';
import { AbstractUserController, AbstractUserService } from './user';

export default class UserController implements AbstractUserController {
	private static instance: AbstractUserController;
	private static userService: AbstractUserService;
	private static readonly router = express.Router();
	private static readonly PATH = '/users';

	public static getInstance(userService: AbstractUserService, app: express.Application): AbstractUserController {
		if (!UserController.instance) {
			UserController.instance = new UserController(userService, app);
		}
		return UserController.instance;
	}

	private constructor(userService: AbstractUserService, app: express.Application) {
		UserController.userService = userService;
		this.initRouter(app);
	}

	initRouter(app: express.Application): void {
		if (UserController.instance) return;
		UserController.router.get('', this.getUserByNickname);
		UserController.router.get('/:id', this.getUserById);
		app.use(UserController.PATH, UserController.router);
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const findUser = await UserController.userService.findUserById(id);
		res.send(findUser);
	}

	async getUserByNickname(req: Request, res: Response): Promise<void> {
		const nickname = String(req.query.nickname);
		const findUser = await UserController.userService.findUserByNickname(nickname);
		res.send(findUser);
	}
}
