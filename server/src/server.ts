const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('../src/schema');
const mongoose = require('mongoose');
const dbUser = require('../dbUser');
const cors = require('cors');
const port : number = 4000; 


const server = express();

server.use(cors());

mongoose.connect('mongodb+srv://' + dbUser.user + ':' + dbUser.password + '@cluster0.tm9p4.mongodb.net/flex-timer?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then((con : any) => {
        console.log(con.connection);
        console.log('DB connection successful');
});



server.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));



server.listen(port, '127.0.0.1', () =>{
    console.log("now listening for requests on port " + port);
});