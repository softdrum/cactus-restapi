const express = require("express"),
  router = express.Router(),
  SensorController = require('../../controllers/sensor.controller'),
  cache = require('../../utils/memory.cache').cache;

router.route('/')
  .post(SensorController.create)
  .get(cache(10), SensorController.read)
  .delete(SensorController.delete);

router.route('/latest')
  .get(cache(10), SensorController.findLatest)

module.exports = router;
