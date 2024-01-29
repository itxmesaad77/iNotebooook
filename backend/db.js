const mongoose = require('mongoose');

const mongoURI="mongodb://127.0.0.1:27017/inotebook?directConnection=true";

const  connectToMongo= async()=> {
  // used to connect the database 
    await mongoose.connect(mongoURI);
  console.log ('Connected To mongo Successfully')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = connectToMongo;