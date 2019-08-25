const faker = require('faker');
const rand = require('../../../client/src/helpers/randomNumber');

const DESIRED_RECORD_NUMBERS = 50;
const USER_ID = 201;

const getEndTime = (datetime) => {
	const startTime = datetime;
	const endTime = new Date(datetime);
	endTime.setHours(startTime.getHours() + rand(1, 10));
	return endTime;
};

const getBikeType = () => {
	return faker.random.arrayElement([
		'BMX',
		'Track cycling',
		'Cyclo-cross',
		'Cycle speedway',
		'Motor-paced racing',
		'Average speeds']);
};

const userData = {
	username: 'ruth-letham',
	password: 'gitgud@js',
};

const userSessions = [];

for (let i = 0; i < DESIRED_RECORD_NUMBERS; i++ ) {
	userSessions.push(	{
		user_id: USER_ID,
		distance: faker.random.number({min: 2, max: 50}),
		start_time: faker.date.recent(),
		end_time: getEndTime(faker.date.recent()),
		start_loc: faker.address.streetName(),
		end_loc: faker.address.streetName(),
		type: getBikeType(),
	});
}

const userGoals = [];


exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Users').del()
		.then(function() {
			// Inserts seed entries
			return knex('Users').insert(userData);
		}).then(function() {
			return knex('Sessions').del()
			;
		}
		) .then(function() {
			return knex('Sessions').insert(userSessions);
		});
};
