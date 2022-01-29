const { Schema, model, Types } = require('mongoose');

const contactSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true, minLength: 10, maxLength: 15 },
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('Contact', contactSchema);