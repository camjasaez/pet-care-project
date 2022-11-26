const { Schema, model } = require('mongoose');

const careTakerSchema = new Schema({
    name: {
        type: String,
    },
    rut: {
        type: String,
        require: true,
        unique: true,
    },
    Number: {
        type: String,
        require: true,
        unique: true,
    },
        

});
module.exports = model('CareTaker', careTakerSchema);