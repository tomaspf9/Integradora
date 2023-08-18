import { Server } from 'socket.io';
import { messageModel } from '../dao/mongo/models/chat.model.js';
import { productModel } from '../dao/mongo/models/product.model.js';

function setupSocket(httpServer) {
  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Buscar productos en DB, escuchar cambios y enviar data:
    const products = await productModel.find().lean();
    io.emit('products', products);

    productModel.watch().on('change', async (change) => {
      const products = await productModel.find().lean();
      io.emit('products', products);
    });

    // Recibir usuarios, mensajes y crear entrada en DB:
    socket.on('user', async (data) => {
      await messageModel.create({
        user: data.user,
        message: data.message,
      });

      const messagesDB = await messageModel.find();
      io.emit('messagesDB', messagesDB);
    });

    socket.on('message', async (data) => {
      await messageModel.create({
        user: data.user,
        message: data.message,
      });

      const messagesDB = await messageModel.find();
      io.emit('messagesDB', messagesDB);
    });

    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} disconnected`);
    });
  })
}

export default setupSocket;