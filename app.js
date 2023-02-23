require('dotenv').config();
const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;

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

app.listen(port, () => {
	console.log(`> app is running at ${port}`.rainbow);
});
