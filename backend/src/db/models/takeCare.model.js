const { Schema, model } = require('mongoose');

const takeCareSchema = new Schema({
  careTaker: {
    type: Schema.Types.ObjectId,
    ref: 'CareTaker',
    required: true,
  },
  cares: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Care',
      required: true,
    },
  ],
});

module.exports = model('TakeCare', takeCareSchema);
