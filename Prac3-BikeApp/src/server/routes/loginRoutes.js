import Router from 'koa-router';
import Users from '../models/Users';

const SUBPATH = '/api';
const VERSION = 0;
const router = new Router({
	prefix: `${SUBPATH}/v${VERSION}`,
});

router.post('/login', async (ctx, next) => {
	const user = await Users.query().first().where({username: ctx.request.body.username});
	const isValid = await user.validatePassword(ctx.request.body.password); // boolean
	return isValid;
});

router.post('/logout', async (ctx, next) => {
	// https://www.geekstrick.com/user-login-logout-restful-api-using-nodejs-express-4/
});

export default router;
