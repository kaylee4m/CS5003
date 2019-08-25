import Router from 'koa-router';
const SUBPATH = '/api';
const VERSION = 0;
const router = new Router({
	prefix: `${SUBPATH}/v${VERSION}`,
});

router.get('/', (ctx, next) => {
	ctx.body = `API Version: ${VERSION}`;
});


export default router;
