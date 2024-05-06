const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura el directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Manejo de conexiones de socket
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  // Maneja el evento de chat
  socket.on('chat message', (msg) => {
    console.log('Mensaje recibido: ' + msg);
    // Envía el mensaje a todos los clientes conectados
    io.emit('chat message', msg);
  });

  // Maneja la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
