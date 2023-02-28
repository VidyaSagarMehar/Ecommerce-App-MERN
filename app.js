require('dotenv').config();
const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose');
// Requiring Middlewares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

// All routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// db connection
mongoose
	.connect(process.env.MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log('> Connected...'.bgMagenta))
	.catch((err) =>
		console.log(
			`> Error while connecting to mongoDB : ${err.message}`.underline.red,
		),
	);
// using middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Starting server
app.listen(port, () => {
	console.log(`> app is running at ${port}`.rainbow);
});
