import Joi from 'joi';
export const schema = {
	register: Joi.object().keys({
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
	}),
	sessions: Joi.object().keys({
		user_id: Joi.number().required(),
		distance: Joi.number(),
		start_time: Joi.required(),
		end_time: Joi.required(),
	}),
	login: Joi.object().keys({
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
	}),
	goals: Joi.object().keys({
		user_id: Joi.number().required(),
		distance: Joi.number().required(),
		location: Joi.string(),
	}),
};
