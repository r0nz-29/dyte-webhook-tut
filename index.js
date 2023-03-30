import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("<h1>Hello world</h1>");
});

app.post("/webhook", (req, res) => {
	console.log("webhook aya");
	console.log(req.body);
});

app.get("/lol", (req, res) => {
	res.json({msg: "lolest"});
});

app.listen(3000, () => {
	console.log("listening on *:3000");
});
