const { polls } = require('../routes/polls');

function startSocket(socket) {
    console.log('A user connected');
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};

module.exports = { startSocket }; 