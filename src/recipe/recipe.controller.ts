import express from 'express';
import { getRecipeByTitle_service } from './recipe.service';

const router = express.Router();

router.get('/recipes', async (req, res) => {
	const title = String(req.query.title);
	const findRecipeList = await getRecipeByTitle_service(title);
	res.send(findRecipeList); // response
});
