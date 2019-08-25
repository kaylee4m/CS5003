const faker = require('faker');

const fakeUsers = [];
const DESIRED_NUMBER = 200;

for (let i = 0; i < DESIRED_NUMBER; i ++) {
	fakeUsers.push({
		username: faker.internet.userName(),
		password: faker.internet.password(32),
	});
}
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Users').del()
		.then(function() {
			// Inserts seed entries
			return knex('Users').insert(fakeUsers);
		});
};
