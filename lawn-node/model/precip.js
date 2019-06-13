const mongoose = require('mongoose');
const Schema = mongoose.Schema;


precipSchema = new Schema({

   
    month: {
        type: String
        
    },
    precip: {
        type: Number,
        
    }
});



module.exports = mongoose.model('precipcharts', precipSchema);