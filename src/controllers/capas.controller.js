import { capasService } from '../services/index.js';

const getCapas = async (req, res) => {
	const result = await capasService.getCapasDao();
	return res.status(200).send(result);
};

const createCapa = async (req, res) => {
	const { name, surname, email } = req.body;
	if (!name || !surname || !email) {
		return res.status(400).send('Faltan datos');
	}
	const newCapa = { name, surname, email };
	const result = await capasService.createCapaDao(newCapa);
	return res.status(201).send(result);
};

export default {
	getCapas,
	createCapa,
};