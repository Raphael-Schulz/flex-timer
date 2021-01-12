const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timerEventSchema = new Schema({
    type: String,
    time: Number,
    text: String
});


const timerSchema = new Schema({
    name: String,
    duration: Number,
    timerEvents: [timerEventSchema]

});

module.exports = mongoose.model('TimerEvent', timerEventSchema);
module.exports = mongoose.model('Timer', timerSchema);