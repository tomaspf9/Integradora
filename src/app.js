// Imports express,mongo....

import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import router from "./routes/router.js";
import config from "./config/enviroment.config.js";
import initializePassport from "./config/passport.config.js";
import __dirname from "./utils.js";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import setupSocket from "./utils/socket.utils.js";


// VE
const mongoUrl = config.MONGO_URL;
const mongoSessionSecret = config.MONGO_URL;
const cookieSecret = config.COOKIE_SECRET;
const PORT = config.PORT;
const HOST = config.HOST;

// APP
const app = express();

// Mongo


const enviroment = async () => {
	await mongoose.connect(mongoUrl);
};
enviroment();
initializePassport();
app.use(
	session({
		store: MongoStore.create({ mongoUrl }),
		secret: mongoSessionSecret,
		resave: false,
		saveUninitialized: true,
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(cookieSecret));



// Socket & Server
app.listen(PORT, HOST, () => {
	console.log(`Server up on http://${HOST}:${PORT}`);
});

router(app);