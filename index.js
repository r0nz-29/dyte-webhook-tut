import express from 'express';
import http from "http";
import {Server} from "socket.io";
import bodyParser from 'body-parser';
import cors from "cors";

const port = process.env.PORT || 4001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post('/webhook', (req, res) => {
  const payload = req.body;
  console.log(payload);
  io.emit('new_meet', payload);
  res.status(200).send('Success');
});


server.listen(port, () => console.log(`Listening on port ${port}`));
