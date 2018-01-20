const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  fb_token: String,
  name: String,
  birth: String,
  phone: String,
  picture: String,
  debt_rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rooms'  }],
  credit_rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rooms'  }]
});

const User = mongoose.model('users', userSchema);
module.exports = User;
