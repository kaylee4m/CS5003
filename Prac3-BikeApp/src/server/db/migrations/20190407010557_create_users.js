
exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('Users', function(table) {
			table.increments('user_id').unsigned().notNullable().primary();
			table.string('username', 320);
			table.text('password');
			table.unique(['username']);
		})
		.then(function() {
			return knex.schema.createTable('Sessions', function(table) {
				table.string('session_id').primary();
				table.integer('user_id').unsigned();
				table.foreign('user_id').references('Users.user_id');
				table.integer('distance');
				table.datetime('start_time');
				table.datetime('end_time');
				table.string('start_loc');
				table.string('end_loc');
				table.string('weather');
				table.string('type');
			});
		})
		.then(function() {
			return knex.schema.createTable('Goals', function(table) {
				table.string('goal_id').primary();
				table.integer('user_id').unsigned();
				table.foreign('user_id').references('Users.user_id');
				table.date('date');
				table.integer('distance');
				table.string('location');
				table.boolean('completed');
			});
		})
		.then(function() {
			return knex.schema.createTable('Locations', function(table) {
				table.string('session_id');
				table.foreign('session_id').references('Sessions.session_id');
				table.text('start_coords');
				table.text('end_coords');
				table.json('path');
			});
		})
	;
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.raw(`SET foreign_key_checks = 0;`),
		// knex.schema.dropTable('Users'),
		// knex.schema.dropTable('Sessions'),
	]);
};
