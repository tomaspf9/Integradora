import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
		required: true,
	},
	age: Number,
	password: String,
	cart: [{ type: mongoose.Schema.Types.String, ref: 'Carts' }],
	role: {
		type: String,
		default: 'user',
	},
});

export const userModel = mongoose.model('Users', userSchema);