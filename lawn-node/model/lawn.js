const mongoose = require('mongoose');
const Schema = mongoose.Schema;


lawnSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nbUsers',
        require: true
    },

    lawnArea: {
        type: Number,
        required: true
    },
    lawnAddress: {
        
            value:{
                type: String,
                required: true
            },
            lat:{
                type: Number,
                required: true
            },
            lng:{
                type: Number,
                required: true
            }
        },
    silty: {
        type: String
    },
    grassType: {
        type: String,
        required: true
    }

});



module.exports = mongoose.model('nbLawns', lawnSchema);