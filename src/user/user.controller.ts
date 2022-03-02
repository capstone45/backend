import express, { Request, Response } from 'express';
import { AbstractUserController, AbstractUserService } from './user';

export default class UserController implements AbstractUserController {
	private static instance: AbstractUserController;
	private static userService: AbstractUserService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/users';

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

		UserController.router.get('/search', this.getByNickname);
		UserController.router.get('/:id', this.getById);
		UserController.router.put('/:id', this.updateById);

		app.use(UserController.PATH, UserController.router);
	}

	async updateById(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		try {
			await UserController.userService.updateById(id, req.body);
			res.status(201).send();
		} catch (error) {
			res.status(400).send();
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const findUser = await UserController.userService.findById(id);
		res.send(findUser);
	}

	async getByNickname(req: Request, res: Response): Promise<void> {
		const nickname = String(req.query.nickname);
		const findUsers = await UserController.userService.findByNickname(nickname);
		res.send(findUsers);
	}
}
