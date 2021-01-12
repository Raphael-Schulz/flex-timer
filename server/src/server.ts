const express = require('express');
const port : number = 4000; 

const server = express();

server.listen(port, () =>{
    console.log("now listening for requests on port " + port);
});