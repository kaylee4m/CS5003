require('@babel/register');
const faker = require('faker');

const DESIRED_NUMBER = 200;
const goals = [];
for (let i = 0; i < DESIRED_NUMBER; i++ ) {
	goals.push({
		goal_id: faker.random.uuid(),
		user_id: faker.random.number({min: 1, max: 200}),
		date: faker.date.recent(),
		distance: faker.random.number({min: 2, max: 50}),
		location: faker.address.streetName(),
		completed: faker.random.boolean(),
	});
}

exports.seed = function(knex, Promise) {
	return knex('Goals').del()
		.then(function() {
			return knex('Goals').insert(goals);
		});
};
