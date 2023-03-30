const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
});

app.post('/webhook', (req, res) => {
	console.log("webhook aya")
});


app.listen(3000, () => {
	console.log('listening on *:3000');
});
