import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
		required: true,
	},
<<<<<<< HEAD
	password: String,
=======
	age: Number,
	password: String,
	cart: [{ type: mongoose.Schema.Types.String, ref: 'Carts' }],
>>>>>>> dabec96f357d0dc304824d02a2679c0a4c871ac9
	role: {
		type: String,
		default: 'user',
	},
});

export const userModel = mongoose.model('Users', userSchema);