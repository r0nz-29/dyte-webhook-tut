import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const port = process.env.PORT || 4001

const app = express()
app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

app.post('/webhook', (req, res) => {
  const payload = req.body
  console.log(payload)
  io.emit('new_meet', payload)
  res.status(200).send('Success')
})

app.post('/person-enrich', (req, res) => {
  const person = req.body
  console.log(person)
  axios.post('https://api.apollo.io/v1/people/match', {
    api_key: '5ez2SxSIQOmxbC4iKZw3bw',
    ...person
  }, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    }
  }).then(({ data }) => {
    console.log(data)
    res.status(200).json({ person: data, ok: true })
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
