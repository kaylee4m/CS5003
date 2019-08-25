import Router from 'koa-router';
import Sessions from '../models/Sessions';
import Session from '../models/Sessions';

const SUBPATH = '/api';
const VERSION = 0;
const router = new Router({
	prefix: `${SUBPATH}/v${VERSION}`,
});

router.get('/sessions', async (ctx, next) => {
	ctx.body = await Sessions.query().eager('locations');
});


router.post('/sessions', async (ctx, next) => {
	try {
		// eslint-disable-next-line camelcase
		const {user_id, distance, start_time, end_time, start_loc, end_loc, type, geojson} = ctx.request.body;
		await Sessions.query().insert({
			user_id: user_id,
			distance: distance,
			start_time: start_time,
			end_time: end_time,
			start_loc: start_loc,
			end_loc: end_loc,
			type: type,
		});

		await Session.query().allowInsert('[locations]')
			.insertGraph({
				user_id: user_id,
				distance: distance,
				start_time: start_time,
				end_time: end_time,
				start_loc: start_loc,
				end_loc: end_loc,
				type: type,
				locations:
					{
						start_coords: start_loc,
						end_coords: end_loc,
						path: geojson,
					},

			});
		ctx.status = 201;
	} catch (err) {
		console.log(err);
	}
});

export default router;
