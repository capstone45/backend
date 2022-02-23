import express, { Request, Response } from 'express';
import UserService from './user.service';

export default class UserController {
	private readonly userController: UserController;
	private readonly userService: UserService;
	private router = express.Router();
	private PATH = '/users';

	constructor(userService: UserService) {
		if (this.userController) return this.userController;
		this.userController = this;
		this.userService = userService;
		this.initRouter();
	}

	private initRouter(): void {
		this.router.get(this.PATH, this.getUserList);
	}

	private async getUserList(req: Request, res: Response): Promise<void> {
		const nickname = String(req.query.nickname);
		const findUserList = await this.userService.getUserList(nickname);
		res.send(findUserList);
	}
}
