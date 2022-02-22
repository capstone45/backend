import express, { Request, Response } from 'express';
import { getUserByNickname_service } from './user.service';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
	const name = String(req.query.name);
	const findUserList = await getUserByNickname_service(name);
	res.send(findUserList); // response
});

/*
쉐프 이름 검색 Query
get     우리서비스주소/users?name=이름

rest api

HTTP Method     path
get             우리서비스주소/users : 전체 유저 목록 받아오기

*/
