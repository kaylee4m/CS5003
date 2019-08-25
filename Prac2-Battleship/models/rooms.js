var rooms = []

module.exports = {
    get() {
        return rooms
    },
    add(params) {
        rooms.push({
            info: params,
            homeowner: params.homeowner,
            enemy: ''
        })
        return rooms.length - 1
    },
    update(idx, value) {
        rooms.splice(idx, 1, value)
        return value
    },
    del(idx) {
        rooms.splice(idx, 1)
    }
}