import capaService from './capas.service.js';
import CapasManager from '../dao/mongo/capas.manager.js';

export const capasService = new capaService(new CapasManager());