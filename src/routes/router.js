// Controladores
import authController from "../controllers/auth.controller.js";
import adminController from "../controllers/admin.controller.js";

// Rutas
import productsRoute from './products.router.js';
import cartsRoute from './cart.routes.js';
import viewsRoute from './views.router.js';
import messagesRoute from './chat.routes.js';
import cookiesRoute from './cookies.router.js';
import sessionsRoute from './sessions.router.js';
import dictionaryRoute from './dictionary.router.js';
import forkRoute from './fork.router.js';
import CustomUsersRouter from './customUser.router.js';
import CustomSessionsRouter from './customSessions.router.js';
const customUsersRouter = new CustomUsersRouter().getRouter();
const customSessionsRouter = new CustomSessionsRouter().getRouter();

import capas from "./capas.routes.js"

const router = (app) => {
  app.use("/auth", authController);
  app.use("/admin", adminController);
  app.use("/", viewsRoute);
  app.use("/api/products", productsRoute);
  app.use("/api/carts", cartsRoute);
  app.use("/api/messages", messagesRoute);
  app.use("/api/cookies", cookiesRoute);
  app.use("/api/sessions", sessionsRoute);
  app.use("/api/dictionary", dictionaryRoute)
  app.use("/api/fork", forkRoute);
  app.use("/api/custom/users", customUsersRouter);
  app.use("/api/custom/sessions", customSessionsRouter);
  
  app.use("/api/capas", capas);
};

export default router;