import Router from 'koa-router';
import Rides from '../models/Rides';
const SUBPATH = '/api';
const VERSION = 0;
const router = new Router({
	prefix: `${SUBPATH}/v${VERSION}`,
});

router.get('/rides', async (ctx, next) => {
	ctx.body = await Rides.query();
});

export default router;
