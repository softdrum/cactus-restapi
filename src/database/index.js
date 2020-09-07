// Bring Mongoose into the app 
const mongoose = require( 'mongoose' );
const config = require('../config')
// Build the connection string 
const dbURL = config.db.url; 


module.exports = {
  init () {
    // Create the database connection 
    mongoose.connect(dbURL); 
    mongoose.set('useFindAndModify', false);
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + dbURL);
    }); 
      
    // If the connection throws an error
    mongoose.connection.on('error',function (err) { 
      console.log('Mongoose default connection error: ' + err);
    }); 

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () { 
      console.log('Mongoose default connection disconnected'); 
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {   
      mongoose.connection.close(function () { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
      }); 
    }); 
  }
}

