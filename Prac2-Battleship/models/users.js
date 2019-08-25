var users = {}

module.exports = {
    setGameRecord(user, record) {
        if (!users[user]) {
            users[user] = []
        }
        users[user].push(record)
    },
    get(user) {
        return users[user]
    }
}