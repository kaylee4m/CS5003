
const getWeekDay = (date) => {
	const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return weekDays[new Date(date.slice(0, 10)).getDay()];
}
module.exports = getWeekDay;

