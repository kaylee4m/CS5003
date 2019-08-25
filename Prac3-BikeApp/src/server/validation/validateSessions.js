import Joi from 'joi';
import {schema} from './schema';

export const validateSessions = async (ctx, next) => {
	const validate = Joi.validate(ctx.request.body, schema.sessions);
	if (validate.error !== null ) {
		return ctx.throw(403);
	}
	await next();
};
