const tls = require('tls')
const fs = require('fs')
const path = require('path')

const tlsSessionStore = {};

var msg = "Hello from server"

var options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'private-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'public-cert.pem')),
};

server = tls.createServer(options, function (s) {
    s.write(msg + "\n");
    s.pipe(s);
})

server.listen(8000);

server.on('newSession', (id, data, cb) => {
    tlsSessionStore[id.toString('hex')] = data;
    cb();
});

server.on('resumeSession', (id, cb) => {
    cb(null, tlsSessionStore[id.toString('hex')] || null);
});


