import Model from './Model';
import uuidv4 from 'uuid';

class Goals extends Model {
	static get tableName() {
		return 'Goals';
	}

	static get idColumn() {
		return 'goal_id';
	}

	// We choose to generate the uuid through node
	// instead of using mysql driver
	$beforeInsert() {
		this.goal_id = uuidv4();
	}
}

export default Goals;
