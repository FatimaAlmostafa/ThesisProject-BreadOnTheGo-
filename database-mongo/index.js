var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

///////////////////////// User's Schema /////////////////////////

var userSchema = mongoose.Schema({
  userName:String,
  email:{
    type: String,
    trim: true
    },
    password:{
      type: String
    },
    phoneNumber: Number,
    latitude: String,
    longtitude: String,
    typeOfPayment: String,
    image:String
});

var User = mongoose.model('User', userSchema);

/////////////////////////Save User/////////////////////////

var saveUser =function(data,callback){
  var NUser= new User(data);
  NUser.save(function(err,data){
    if(err){
      callback(err,null)
    }
    callback(null,data)
  })
}

///////////////////////// Bakery's Schema /////////////////////////

var bakerySchema = mongoose.Schema({
  bakeryName:String,
  email:{
    type: String,
    trim: true
    },
    password:{
      type: String
    },
    phoneNumber: Number,
    latitude: String,
    longtitude: String,
    typeOfPayment: String,
    image:String
});

var Bakery = mongoose.model('Bakery', bakerySchema);

/////////////////////////Save Bakery/////////////////////////

var saveBakery =function(data,callback){
  var NBakery= new User(data);
  NBakery.save(function(err,data){
    if(err){
      callback(err,null)
    }
    callback(null,data)
  })
}
///////////////////////// Prouducts' Schema /////////////////////////

var prouductSchema = mongoose.Schema({
  name:{ type: String, unique: true },
  description:String,
  img : {type: String },
  price:Number
});

var Prouduct = mongoose.model('Prouduct',prouductSchema);

///////////////////////// Save Prouducts' /////////////////////////

var saveProuduct = function(data,callback){
  var NewProuduct = new Prouduct(data);
  NewProuduct.save(function(err,dataRes){
    if(err){
      console.log("err in saving product")
      callback(err,null)
    }
    callback(null,dataRes)
  });
};

///////////////////////// selectAll Prouducts /////////////////////////

var selectAll = function(callback) {
  Prouduct.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

//////////////////////////////////////////////

module.exports.Prouduct = Prouduct;
module.exports.User = User;
module.exports.saveUser = saveUser;
module.exports.Bakery = Bakery;
module.exports.saveBakery = saveBakery;
module.exports.saveProuduct = saveProuduct;
module.exports.selectAll = selectAll;
