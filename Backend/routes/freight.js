const express = require('express');
const router = express.Router();
const freightController = require('../controllers/freightController');

router.post('/freight', freightController.getFreight);

module.exports = router;
