import Router from 'koa-router';
import Goals from '../models/Goals';

const SUBPATH = '/api';
const VERSION = 0;
const router = new Router({
	prefix: `${SUBPATH}/v${VERSION}`,
});

router.get('/goals', async (ctx, next) => {
	ctx.body = await Goals.query();
});


router.post('/goals', async (ctx, next) => {
	try {
		await Goals.query().insert(ctx.request.body);
		ctx.status = 201;
	} catch (err) {
		console.log(err);
	}
});

export default router;
