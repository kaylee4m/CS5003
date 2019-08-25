var express = require('express');
var router = express.Router();
var Users = require('../models/users')
/* GET users listing. */
router.get('/', function (req, res) {
  res.json(Users.get(req.query.user) || [])
});
router.post('/setGameRecord', function (req, res) {
  const { user, time, win } = req.body
  Users.setGameRecord(user, {
    time, win
  })
  res.json('ok')
})

module.exports = router;
