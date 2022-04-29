import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ServerError } from './helper';

async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const requestHeader = req.headers['authorization'];
		const accessToken = requestHeader && requestHeader.split(' ')[1];

		if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
			res.status(401).send({ msg: 'undefined JWT' });
			return;
		}

		const userId = jwt.verify(accessToken, process.env.JWT_SECRETE);

		if (!userId) {
			res.status(401).send({ msg: 'invalid JWT' });
			return;
		}

		req['userId'] = Number(userId);
		next();
	} catch (error) {
		res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
		return;
	}
}

export { auth };
