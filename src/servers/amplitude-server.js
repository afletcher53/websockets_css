const express = require('express')
const WebSocket = require('ws')
const http = require('http')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const clients = []

wss.on('connection', (ws) => {
  console.log('Client connected')
  clients.push(ws)

  ws.on('message', (message) => {
    console.log(`Amplitude Received: ${message}`)
    clients.forEach((client) => {
      if (client !== ws) {
        client.send(`${message}`)
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
    const index = clients.indexOf(ws)
    if (index > -1) {
      clients.splice(index, 1)
    }
  })
})

server.listen(3001, () => {
  console.log('Amplitude Websocket Server listening on port 3001')
})
