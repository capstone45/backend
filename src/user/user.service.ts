import { getUserByNickname } from './user.repository';

async function getUserByNickname_service(nickname: string) {
	const findUserList = await getUserByNickname(nickname);
	return findUserList;
}

export { getUserByNickname_service };
