import Model from './Model';

class Locations extends Model {
	static get tableName() {
		return 'Locations';
	}

	static get idColumn() {
		return 'session_id';
	}

	// We choose to generate the uuid through node
	// instead of using mysql driver
	$beforeInsert() {
		// pass
		// This should validate the integrity of the database
	}
}

export default Locations;
