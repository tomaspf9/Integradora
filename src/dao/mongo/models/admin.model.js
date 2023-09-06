import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'admin',
	},
});

export const adminModel = mongoose.model('Admins', adminSchema);