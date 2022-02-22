async function getRecipeByTitle(title: string) {
	const findRecipeList = await new Promise((res) => {
		setTimeout(() => {
			res(Object.values(DUMMY_DATA).filter((recipe) => recipe.title === title));
		}, 3000);
	});
	return findRecipeList;
}

const DUMMY_DATA = {
	1: {
		title: 'title1',
		description: 'desc1',
	},
	2: { title: 'title2', description: 'desc2' },
	3: {
		title: 'title3',
		description: 'desc3',
	},
};

export { getRecipeByTitle };
