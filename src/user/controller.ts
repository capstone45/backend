import express, { Request, Response, NextFunction } from 'express';

import { AbsUserController, IRequest } from './type/controller';
import { AbsUserService } from './type/service';

import { ServerError } from '../helper/helper';
import UserError from './type/error';

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
		UserController.router.get('/today-chef', this.getTodayChef);
		UserController.router.get('/:id', this.getById);

		UserController.router.post('/signin', this.signIn);
		UserController.router.post('/login', this.logIn);
		UserController.router.post('/logout', this.auth, this.logOut);

		UserController.router.patch('/', this.auth, this.updateUserInfomation);
		UserController.router.put('/thumbnail', this.auth, this.updateThumbnail);

		UserController.router.delete('/thumbnail', this.auth, this.deleteThumbnail);
		UserController.router.delete('/signout', this.auth, this.signOut);

		app.use(UserController.PATH, UserController.router);
	}

	//middleware
	async auth(req: IRequest, res: Response, next: NextFunction): Promise<void> {
		try {
			const token = req.cookies.x_auth;
			const userId = await UserController.userService.auth(token);

			req.userId = userId;
			next();
		} catch (error) {
			next(error);
		}
	}

	async signIn(req: Request, res: Response): Promise<void> {
		try {
			const createUserInformation = req.body;
			const user = await UserController.userService.signIn(createUserInformation);

			res.status(201).send(user);
		} catch (error) {
			switch (error.message) {
				case UserError.USER_ID_EXISTS.message:
					res.status(UserError.USER_ID_EXISTS.code).send(UserError.USER_ID_EXISTS.message);
					return;
				case UserError.PASSWORD_NOT_MATCH.message:
					res.status(UserError.PASSWORD_NOT_MATCH.code).send(UserError.PASSWORD_NOT_MATCH.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async signOut(req: IRequest, res: Response): Promise<void> {
		try {
			const userId = Number(req.userId);
			await UserController.userService.signOut(userId);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async logIn(req: Request, res: Response): Promise<void> {
		try {
			const logInUserInformation = req.body;
			const userToken = await UserController.userService.logIn(logInUserInformation);
			res.cookie('x_auth', userToken).status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				case UserError.PASSWORD_NOT_MATCH.message:
					res.status(UserError.PASSWORD_NOT_MATCH.code).send(UserError.PASSWORD_NOT_MATCH.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async logOut(req: Request, res: Response): Promise<void> {
		try {
			res.cookie('x_auth', '').status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async updateThumbnail(req: IRequest, res: Response): Promise<void> {
		try {
			const userId = Number(req.userId);
			const { thumbnailUrl } = req.body;

			await UserController.userService.updateThumbnail(userId, thumbnailUrl);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async deleteThumbnail(req: IRequest, res: Response): Promise<void> {
		try {
			const userId = Number(req.userId);

			await UserController.userService.deleteThumbnail(userId);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async updateUserInfomation(req: IRequest, res: Response): Promise<void> {
		try {
			const userId = Number(req.userId);
			const updateUserInfomation = req.body;

			await UserController.userService.updateUserInfomation(userId, updateUserInfomation);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				case UserError.PASSWORD_NOT_MATCH.message:
					res.status(UserError.PASSWORD_NOT_MATCH.code).send(UserError.PASSWORD_NOT_MATCH.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
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
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
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
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getTodayChef(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserController.userService.getTodayChef();
			res.status(200).send(users);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
}
