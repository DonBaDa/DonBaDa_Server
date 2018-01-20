const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  creditor: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  debtor: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  D_day: String,
  amount: String,
  title: String,
  isEnd: Boolean
});

const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;
