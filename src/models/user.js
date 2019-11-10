const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true
		match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	},
	password: {type: String, required: true}
  phoneNumber: String,
  Address: String
});

module.exports = mogoose.model('User', userSchema);
