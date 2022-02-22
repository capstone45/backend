import express from 'express';
import { getRecipeByTag_service } from './tag.service';

const router = express.Router();

router.get('/recipes', async (req, res) => {
	const title = String(req.query.title);
	const findRecipeList = await getRecipeByTag_service(title);
	res.send(findRecipeList); // response
});
