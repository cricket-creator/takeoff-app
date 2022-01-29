const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactList: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
});

module.exports = model('User', userSchema);