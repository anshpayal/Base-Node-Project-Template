const express = require('express');
const {infoController} = require('../../controllers');

const router = express.Router();

/*
router.get('/info', (req, res)=>{ //This is controller function because it contains request and response object. So, we can segregate it into controllers folder.
    return res.json({message: "OK"});
});
*/
router.get('/info', infoController.info); 

module.exports = router;