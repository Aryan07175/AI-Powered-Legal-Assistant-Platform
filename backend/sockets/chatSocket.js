module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room for chat
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Send chat messages
    socket.on('send_message', (data) => {
      io.to(data.roomId).emit('receive_message', data);
    });

    // WebRTC signaling
    socket.on('call_user', (data) => {
      io.to(data.userToCall).emit('call_user', { signal: data.signalData, from: data.from, name: data.name });
    });

    socket.on('answer_call', (data) => {
      io.to(data.to).emit('call_accepted', data.signal);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
