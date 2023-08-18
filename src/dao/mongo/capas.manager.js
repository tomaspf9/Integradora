import { capasModel } from "./models/capas.model.js"

export default class CapasManager {
	constructor() {
		this.capas = [];
	}

	getCapasManager = async () => {
		try {
			this.capas = await capasModel.find();
			return this.capas;
		} catch (err) {
			console.log(`Catch error: ${err}`);
		};
	};

	createCapaManager = async (capa) => {
		this.capas = await capasModel.create(capa);
		return this.capas;
	};
}