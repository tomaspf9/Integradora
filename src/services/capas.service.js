export default class capaService {
    constructor(dao) {
      this.dao = dao;
    };
  
    getCapasDao = () => {
      return this.dao.getCapasManager();
    };
  
    createCapaDao = (capa) => {
      return this.dao.createCapaManager(capa);
    };
  };