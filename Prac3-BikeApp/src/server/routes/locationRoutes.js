import Router from 'koa-router';
import Locations from '../models/Locations';

const SUBPATH = '/api';
const VERSION = 0;
const router = new Router({
	prefix: `${SUBPATH}/v${VERSION}`,
});

router.get('/locations', async (ctx, next) => {
	ctx.body = await Locations.query();
});

router.get('/locations/:session_id', async (ctx, next) => {
	ctx.body = await Locations.query().select().where('session_id', ctx.params.session_id);
});


router.post('/locations', async (ctx, next) => {
	try {
		await Locations.query().insert(ctx.request.body);
		ctx.status = 201;
	} catch (err) {
		console.log(err);
	}
});

export default router;
