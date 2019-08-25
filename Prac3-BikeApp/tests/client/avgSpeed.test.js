const avgSpeed = require('./avgSpeed.js');

describe('Return the correct average speed', () => {
	// Correct average speed
	test('It should return the average speed', () => {
		expect(avgSpeed('2019-04-05T14:00:18.000Z', '2019-04-05T14:54:18.000Z', 165)).toBe(183.3);
	});

	// Correct average speed
	test('It should return the average speed', () => {
		expect(avgSpeed('2019-04-05T14:00:18.000Z', '2019-04-05T14:00:38.000Z', 30)).toBe(5400);
	});

	// Correct average speed
	test('It should return the average speed', () => {
		expect(avgSpeed('2019-04-05T14:16:18.000Z', '2019-04-09T14:16:18.000Z', 890)).toBe(9.3);
	});

});
