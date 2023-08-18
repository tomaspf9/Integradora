import mongoose from 'mongoose';

const capaSchema = new mongoose.Schema({
	name: String,
	surname: String,
	email: String,
});

export const capasModel = mongoose.model('Capas', capaSchema);