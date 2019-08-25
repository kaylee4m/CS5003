import request from 'supertest';
import server from '../../src/server/app';

beforeAll(async () => {
	console.log('Running tests');
});

// Close server after each tests
afterAll(async (done) => {
	console.log('Closing server…');
	server.close();
	done();
});

describe('Basic json test', () => {
	test('GET /', async () => {
		const response = await request(server).get('/api/v0');
		expect(response.status).toEqual(200);
		expect(response.type).toEqual('application/json');
	});
});

describe('Endpoints Health Check', () => {
	test('GET /', () => {
		return request(server).get('/api/v0').expect(200);
	});

	test('GET /users', () => {
		return request(server).get('/api/v0/users').expect(200);
	});

	test('GET /sessions', () => {
		return request(server).get('/api/v0/sessions').expect(200);
	});
});

describe('POST Method', () => {
	test(`POST /sessions`, () => {
		return request(server).post('/api/v0/sessions').send({
			user_id: 1,
			distance: 10,
			start_time: '2019-04-15 06:47:51',
			end_time: '2019-04-15 08:47:51',
		}).expect(201);
	});
});
