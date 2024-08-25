import { createServer } from 'node:http';

import { Server } from 'socket.io';
import dotenv from 'dotenv';
import handleSocket from './handler';

dotenv.config({ path: '.env.local' });

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

handleSocket(io);

const PORT = process.env.SOCKET_PORT;
server.listen(PORT);
