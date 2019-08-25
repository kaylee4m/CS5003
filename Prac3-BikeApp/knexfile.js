const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');
module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: '5003_bike_dev',
		},
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},
	staging: {
		client: 'mysql',
		connection: {
			host: 'ajw40.host.cs.st-andrews.ac.uk',
			user: 'ajw40',
			password: 'q8z7.ZYJ39fT5V',
			database: 'ajw40_5003_bike_stage',
		},
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},
};
