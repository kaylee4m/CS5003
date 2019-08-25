import Model from './Model';
import uuidv4 from 'uuid';
import path from 'path';

class Session extends Model {
	static get tableName() {
		return 'Sessions';
	}

	static get idColumn() {
		return 'session_id';
	}

	static get relationMappings() {
		return {
			locations: {
				relation: Model.HasOneRelation,
				modelClass: path.join(__dirname, './Locations'),
				join: {
					from: 'Sessions.session_id',
					to: 'Locations.session_id',
				},
			},
		};
	}

	// We choose to generate the uuid through node
	// instead of using mysql driver
	$beforeInsert() {
		this.session_id = uuidv4();
	}
}

export default Session;
