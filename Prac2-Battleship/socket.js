var rooms = require('./models/rooms');
var users = require('./models/users');
function shipsFlat(value) {
    const arr = []
    value.forEach(v => {
        arr.push(...v)
    })
    return arr
}

//房间里所有人都能收到
function toEveryoneInRoom(io, id, event, payload) {
    io.sockets.in(id).emit(event, payload);
}
//只有自己能收到
function toSelf(socket, event, payload) {
    socket.emit(event, payload);
}
//房间里除了自己都能收到
function toOthersInRoom(socket, id, event, payload) {
    socket.broadcast.to(id).emit(event, payload);
}


function ws(io, socket) {
    const roomId = socket.handshake.query.roomId
    socket.join(roomId, () => {
        let rooms = Object.keys(socket.rooms);
    });


    socket.on('message', function (msg) {
        const { action, data } = msg
        switch (action) {
            case 'ready':
                var { id, player } = data
                var idx = +id
                var room = rooms.get()[idx]
                if (room.enemyShips && room.homeownerShips) {
                    //所有人包括自己
                    toEveryoneInRoom(io, id, 'message', {
                        action: 'allReady'
                    })
                    // socket.broadcast.to(roomid).emit('event_name', data); //所有人不包括自己
                }
                break;
            case 'start':
                var { id } = data
                toEveryoneInRoom(io, id, 'message', {
                    action: 'start'
                })

                break;
            case 'pause':
                var { id, pause } = data
                toOthersInRoom(socket, id, 'message', {
                    action: "pause",
                    data: pause
                })
                break;
            case 'quit':
                var { id } = data
                socket.leave(id);
                toOthersInRoom(socket, id, 'message', {
                    action: "quit",
                })
                rooms.del(+id)
                break;
            case 'game':
                var { id, xy, role, user } = data
                var idx = +id
                var room = rooms.get()[idx]
                var { enemyShips, homeownerShips, enemyShips_flat, homeownerShips_flat } = room
                var ships = shipsFlat(role === 'enemy' ? homeownerShips : enemyShips)
                var xyIdx = 0
                var over = false
                var winner = ''

                if (role === 'enemy') {
                    xyIdx = homeownerShips_flat.indexOf(xy)

                    homeownerShips_flat.splice(xyIdx, 1)
                    rooms.update(idx, {
                        ...room,
                        homeownerShips_flat
                    })
                    if (homeownerShips_flat.length === 0) {
                        over = true
                        rooms.del(+id)
                        winner = 'enemy'
                        users.setGameRecord(user, {
                            time: new Date(),
                            win: true
                        })
                    }
                } else {
                    xyIdx = enemyShips_flat.indexOf(xy)
                    enemyShips_flat.splice(xyIdx, 1)
                    rooms.update(idx, {
                        ...room,
                        enemyShips_flat
                    })
                    if (enemyShips_flat.length === 0) {
                        over = true
                        rooms.del(+id)
                        winner = 'homeowner'
                        users.setGameRecord(user, {
                            time: new Date(),
                            win: true
                        })
                    }
                }

                toSelf(socket, 'message', {
                    action: "game_isShoot",
                    data: {
                        shoot: ships.includes(xy),
                        xy,
                        over,
                        winner,
                        nextPlayer: role === 'enemy' ? 'homeowner' : 'enemy'
                    }
                })

                toOthersInRoom(socket, id, 'message', {
                    action: "game_shooted",
                    data: {
                        shoot: ships.includes(xy),
                        xy,
                        over,
                        winner,
                        nextPlayer: role === 'enemy' ? 'homeowner' : 'enemy'
                    }
                })
            default:
                break;
        }

    })
}

module.exports = ws