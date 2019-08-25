export default class ApiWrapper {
	fetchUserData() {
		// pass
	}

	static postUserSession(url, data) {
		return fetch(url, {
			method: 'post', 
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}

	static postUserGoal(url, data) {
		return fetch(url, {
			method: 'post', 
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}
}