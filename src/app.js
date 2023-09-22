import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import compression from 'express-compression';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import __dirname from './directory.js';
import router from './routes/router.js';
import setupSocket from './utils/socket.utils.js';
import config from './config/environment.config.js';
import initializePassport from './config/passport.config.js';
import logger from './utils/logger.util.js';

const mongoUrl = config.MONGO_URL;
const mongoSessionSecret = config.MONGO_URL;
const cookieSecret = config.COOKIE_SECRET;
const PORT = config.PORT;
const HOST = config.HOST;

const initializeApp = () => {
	const app = express();
	initializePassport();

	app.use(
		session({
			store: MongoStore.create({ mongoUrl }),
			secret: mongoSessionSecret,
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(
		compression({
			brotli: {
				enable: true,
				zlib: {},
			},
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.engine('handlebars', handlebars.engine());
	app.set('views', __dirname + '/views');
	app.set('view engine', 'handlebars');
	app.use(express.static(__dirname + '/public'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser(cookieSecret));
	app.use(morgan('dev'));
	app.use(cors());

	const httpServer = app.listen(PORT, HOST, () => {
		logger.info(`Server up on http://${HOST}:${PORT}`);
	});
	setupSocket(httpServer);

	router(app);
};

export default initializeApp;