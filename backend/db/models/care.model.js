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
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      unique: true,
    },
  ],
  careTaker: {
    type: Schema.Types.ObjectId,
    ref: 'CareTaker',
  },
});

module.exports = model('Care', careSchema);
