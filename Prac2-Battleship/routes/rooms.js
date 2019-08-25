var express = require('express');
var rooms = require('../models/rooms')
var router = express.Router();

function shipsFlat(value) {
    const arr = []
    value.forEach(v => {
        arr.push(...v)
    })
    return arr
}

router.get('/', function (req, res, next) {
    res.json(rooms.get())
});

router.post('/', function (req, res, next) {
    res.json(rooms.add(req.body))
});

router.post('/setShips', function (req, res) {
    const { id, role, ships } = req.body
    const idx = +id
    const room = rooms.get()[idx]
    if (role === 'enemy') {
        room.enemyShips = ships
        room.enemyShips_flat = shipsFlat(ships)
    } else {
        room.homeownerShips = ships
        room.homeownerShips_flat = shipsFlat(ships)
    }
    res.json(rooms.update(idx, room))
})

router.post('/setEnemy', function (req, res) {
    const { id, name } = req.body
    const idx = +id
    const room = rooms.get()[idx]
    room.enemy = name
    res.json(rooms.update(idx, room))
})

router.delete('/', function (req, res) {
    const { id } = req.params
    rooms.del(+id)
    res.json('ok')
})
module.exports = router;
