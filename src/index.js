// Basic server configuration.
const express = require('express');
const {PORT} = require('./config/index.js');
const apiRoutes = require('./routes')

const server = express();

server.use('/api', apiRoutes); //when ever we get request starting with "/api", we will redirect it to apiRoutes (which means inside routes/index.js).

server.listen(PORT, ()=>{
    console.log(`Server is listening on PORT:${PORT}`);
})