async function getUserByNickname(nickname: string) {
	const findUserList = await new Promise((res) => {
		setTimeout(() => {
			res(
				Object.values(DUMMY_DATA).filter((user) => user.nickname === nickname)
			);
		}, 3000);
	});
	return findUserList;
}

const DUMMY_DATA = {
	1: {
		id: 'id1',
		password: 'password1',
		nickname: 'nickname1',
	},
	2: { id: 'id2', password: 'password2', nickname: 'nickname2' },
	3: {
		id: 'id3',
		password: 'password3',
		nickname: 'nickname3',
	},
};

export { getUserByNickname };
