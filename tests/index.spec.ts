import request from 'supertest';
import App from '../src/index';

describe('user controller, service, repository 작동 확인', () => {
	it('닉네임 검색', () => {
		request(new App().getApp())
			.get('/users')
			.query({ nickname: 'nickname1' })
			.expect(200, {
				id: 'id1',
				password: 'password1',
				nickname: 'nickname1',
			});
	});
});
