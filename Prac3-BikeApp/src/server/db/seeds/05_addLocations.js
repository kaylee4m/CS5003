require('@babel/register');
const faker = require('faker');
const geojson = require('../test_seed/geojson');

exports.seed = function(knex, Promise) {
	return knex('Locations').del()
		.then(function() {
			const locationData = [];
			// return knex('Locations').insert(locationData);
			return knex('Sessions').pluck('session_id').then((sessions) => {
				console.log(geojson);
				sessions.forEach((i) => {
					locationData.push({
						session_id: i,
						start_coords: faker.address.longitude(),
						end_coords: faker.address.latitude(),
						path: JSON.stringify(geojson),
					});
				});
			}).then(function() {
				return knex('Locations').insert(locationData);
			});
		});
}
;
