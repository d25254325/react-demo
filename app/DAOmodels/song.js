var mongoose = require('mongoose');
var schema = mongoose.Schema;

module.exports = mongoose.model('songs',new schema({
    name: String,
    author: String,
    lyric: String,
    type: String
}));