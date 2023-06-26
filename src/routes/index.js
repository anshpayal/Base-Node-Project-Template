const express = require('express');
const v1Routes = require('./v1');

const router = express.Router();

router.use('/v1', v1Routes); //in any point of time we got '/v1' after '/api' then we will redirect to v1Routes

module.exports = router;
