var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
    id : Number,
    unique_id: Number,
    username: String,
    password : String,
    email: String,
    guess_count : {type : Number , min : 0 , max : 3, default: 0 }
});

var user_model = mongoose.model('user_model', user_schema, "user");

// this should be in env variable but for this demo i am placing it here
var dbHost = 'mongodb://user:user@ds131137.mlab.com:31137/guessno';
mongoose.connect(dbHost);

module.exports = {
  user_model: user_model,
  user: "string"
}
