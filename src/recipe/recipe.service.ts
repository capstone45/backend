import { getRecipeByTitle } from './recipe.repository';

async function getRecipeByTitle_service(title: string) {
	const findRecipeList = await getRecipeByTitle(title);
	return findRecipeList;
}

export { getRecipeByTitle_service };
