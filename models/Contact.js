const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: { type: String, required: true, minLength: 1 },
  phone: { type: String, required: true, unique: true, minLength: 10, maxLength: 15 },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Contact', contactSchema);