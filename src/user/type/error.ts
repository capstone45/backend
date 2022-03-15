const UserError = {
	NOT_FOUND: { type: 'USER_NOT_FOUND', code: 404 },
	NOT_AUTHORIZED: { type: 'NOT_AUTHORIZED', code: 401 },
	PASSWORD_NOT_MATCH: { type: 'PASSWORD_NOT_MATCH', code: 403 },
};

export default UserError;
