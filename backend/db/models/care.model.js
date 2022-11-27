const { Schema, model } = require('mongoose');

const careSchema = new Schema({
  entryDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  exitDate: {
    type: Date,
    default: null,
  },
  withdrawn: {
    type: Boolean,
    default: false,
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  },
});

module.exports = model('Care', careSchema);
