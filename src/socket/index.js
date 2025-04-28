const { polls } = require('../routes/polls');

function startSocket(socket) {
    console.log('A user connected');

    socket.on('joinPoll', (pollId) => {
        console.log(`User joined poll ${pollId}`);
        socket.join(pollId);  

        const poll = polls.find(p => p.id === pollId);
        if (poll) {
            sendResult(socket, poll); 
        }
    });

    socket.on('vote', (pollId, optionIndex) => {
        console.log(`User voted on poll ${pollId}, option ${optionIndex}`);

        const poll = polls.find(p => p.id === pollId);
        if (poll) {
            poll.votes[optionIndex] += 1; 

            io.to(pollId).emit('pollResults', poll);  
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};

module.exports = { startSocket }; 