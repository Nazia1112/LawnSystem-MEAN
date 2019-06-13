const mongoose = require('mongoose');
const Schema = mongoose.Schema;


tempSchema = new Schema({

   
    month: {
        type: String
        
    },
    temp: {
        type: Number,
        
    }
});



module.exports = mongoose.model('tempcharts', tempSchema);