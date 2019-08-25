import Joi from 'joi';
import {schema} from './schema';
export const validateRegisterDetails = async (ctx, next) => {
	const validate = Joi.validate(ctx.request.body, schema.register);
	if (validate.error !== null) {
		return ctx.status = 500;
	};
	await next();
};
