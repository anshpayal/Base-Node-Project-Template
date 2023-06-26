const statusCodes = require('http-status-codes');

const info = (req,res)=>{
    return res.status(statusCodes.OK).json({  //this is response structure. 
        success: 'true',
        message: 'API is Live',
        error:{},
        data:{}
    });
}
// when we do "res.status(500).json" then "res.status(500)" will return same response object and on that response object we are doing res.json().
// But instead of using raw status code we can use 'http-status-codes' module.


module.exports={
    info
}