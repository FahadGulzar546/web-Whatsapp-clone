let app = require('express');
let express = app();
express.use(app.static('codefiles'));
let http = require('http').Server(express);
let io = require('socket.io')(http);
let fs = require('fs');
express.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on('connection', (serve) => {
    console.log('connected');
    serve.on('name', (name) => {
        serve.broadcast.emit('sname', name);
        serve.on('message', (message) => {
            console.log(message)
            serve.broadcast.emit('smessage', { n: name, m: message });
            
        })
        
    })
    serve.on('disconnect', () => {
        console.log('disconnect');
    })
})
let port = 8000;
http.listen(8000, () => {
    console.log(`server is ready at http://127.0.0.1:${port}`)
})