const formatTime = (time) => {
	const arr = new Date(time).toDateString().split(' ')
	arr.shift()
	arr.pop()
	return arr.reverse().join(' ')
}

module.exports = formatTime;