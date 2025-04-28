const { polls } = require('../routes/polls');

function startSocket(socket) {
    console.log('A user connected');

    socket.on('joinPoll', (pollId) => {
        console.log(`User joined poll ${pollId}`);
        socket.join(pollId.toString());
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};

module.exports = { startSocket }; 