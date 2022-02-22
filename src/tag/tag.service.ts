import { getRecipeByTag } from './tag.repository';

async function getRecipeByTag_service(tag: string) {
	const findRecipeList = await getRecipeByTag(tag);
	return findRecipeList;
}

export { getRecipeByTag_service };
