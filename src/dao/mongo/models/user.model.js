import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	age: Number,
	password: {
		type: String,
		required: true,
	},
	cart: [{ type: mongoose.Schema.Types.String, ref: 'Carts' }],
	role: {
		type: String,
		default: "user",
		required: true,
	},
});


export const userModel = mongoose.model('Users', userSchema);