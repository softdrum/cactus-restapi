const express = require("express"),
  router = express.Router(),
  sensorRoutes = require("./routes/sensor.routes");

router.use('/database/sensors-data', sensorRoutes);

module.exports = router;