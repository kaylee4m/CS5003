import Router from 'koa-router';
import Users from '../models/Users';
import {validateRegisterDetails} from '../validation/validateRegisterDetails';

const SUBPATH = '/api';
const VERSION = 0;
const router = new Router({
	prefix: `${SUBPATH}/v${VERSION}`,
});

router.get('/users', async (ctx, next) => {
	ctx.body = await Users.query().select().eager('[sessions, goals]');
});

router.get('/users/:username', async (ctx, next) => {
	ctx.body = await Users.query().select().where('username', ctx.params.username).eager('[sessions, goals, sessions.locations]');
});

router.post('/register', validateRegisterDetails, async (ctx, next) => {
	try {
		await Users.query().insert(ctx.request.body);
		ctx.status = 201;
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = err.message;
	}
});

export default router;
