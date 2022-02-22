async function getRecipeByTag(tag: string) {
	const findRecipeList = await new Promise((res) => {
		setTimeout(() => {
			res(
				Object.values(DUMMY_DATA).filter((recipe) => recipe.tags.includes(tag))
			);
		}, 3000);
	});
	return findRecipeList;
}

const DUMMY_DATA = {
	1: {
		title: 'title1',
		description: 'desc1',
		tags: ['tag1', 'tag2'],
	},
	2: { title: 'title2', description: 'desc2', tags: ['tag1', 'tag3'] },
	3: {
		title: 'title3',
		description: 'desc3',
		tags: ['tag2', 'tag4'],
	},
};

export { getRecipeByTag };
