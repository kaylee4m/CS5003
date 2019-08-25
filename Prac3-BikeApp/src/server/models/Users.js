import Model from '../models/Model';
const Password = require('objection-password')();
import path from 'path';
// eslint-disable-next-line new-cap
class Users extends Password(Model) {
	static get tableName() {
		return 'Users';
	}

	static get idColumn() {
		return 'user_id';
	}

	static get relationMappings() {
		// Importing models here is a one way to avoid require loops.
		return {
			sessions: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, './Sessions'),
				join: {
					from: 'Users.user_id',
					to: 'Sessions.user_id',
				},
			},
			goals: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, './Goals'),
				join: {
					from: 'Users.user_id',
					to: 'Goals.user_id',
				},
			},
		};
	}

	// Validates password
	async validatePassword(password) {
		const user = this;
		const compare = user.verifyPassword(password);
		return compare;
	}
}

export default Users;
