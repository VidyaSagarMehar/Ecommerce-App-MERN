const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

mongoose
	.connect('mongodb://localhost:27017/ecommerce-app', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log('> Connected...'.bgCyan))
	.catch((err) =>
		console.log(
			`> Error while connecting to mongoDB : ${err.message}`.underline.red,
		),
	);

app.listen(port, () => {
	console.log(`> app is running at ${port}`.rainbow);
});
