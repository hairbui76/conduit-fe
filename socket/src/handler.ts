import { Server } from 'socket.io';

export default function handleSocket(io: Server) {
  const users = new Map<string, string>();

  io.on('connection', socket => {
    users.set(String(socket.handshake.query.username), socket.id);

    socket.on('disconnect', () => {
      users.delete(String(socket.handshake.query.username));
    });

    socket.on(
      'comment',
      ({
        from,
        to,
        postSlug,
        postTitle
      }: {
        from: string;
        to: string;
        postSlug: string;
        postTitle: string;
      }) => {
        if (from === to || !users.has(to)) return;
        socket.to(String(users.get(to))).emit('comment', {
          user: from,
          postSlug,
          postTitle
        });
      }
    );

    socket.on(
      'like',
      ({
        from,
        to,
        postSlug,
        postTitle
      }: {
        from: string;
        to: string;
        postSlug: string;
        postTitle: string;
      }) => {
        if (from === to || !users.has(to)) return;
        socket.to(String(users.get(to))).emit('like', {
          user: from,
          postSlug,
          postTitle
        });
      }
    );
  });
}
