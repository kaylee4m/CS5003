require('@babel/register');
const faker = require('faker');
const rand = require('../../../client/src/helpers/randomNumber');

const DESIRED_NUMBER = 200;
const details = [];
for (let i = 0; i < DESIRED_NUMBER; i++ ) {
	const startTime = faker.date.recent();
	const endTime = new Date(startTime);
	endTime.setHours(startTime.getHours() + rand(1, 10));

	details.push({
		session_id: faker.random.uuid(),
		user_id: faker.random.number({min: 1, max: 200}),
		distance: faker.random.number({min: 2, max: 50}),
		start_time: startTime,
		// end_time: faker.date.future(),
		end_time: endTime,
		start_loc: faker.address.streetName(),
		end_loc: faker.address.streetName(),
		type: faker.random.arrayElement([
			'BMX',
			'Track cycling',
			'Cyclo-cross',
			'Cycle speedway',
			'Motor-paced racing',
			'Average speeds']),
	});
}

exports.seed = function(knex, Promise) {
	return knex('Sessions').del()
		.then(function() {
			return knex('Sessions').insert(details);
		});
};
