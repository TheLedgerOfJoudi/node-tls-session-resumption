import tls = require('tls')
import fs = require('fs')
import path = require('path')

const tlsSessionStore: Record<string, Buffer> = {};

var msg = "Hello from server"

var options: tls.TlsOptions = {
    key: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/private-key.pem')),
    cert: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/public-cert.pem')),
};

const server: tls.Server = tls.createServer(options, function (s: tls.TLSSocket) {
    s.write(msg + "\n");
    s.pipe(s);
})

server.listen(8000);

server.on('newSession', (id: Buffer, data: Buffer, cb: () => void) => {
    tlsSessionStore[id.toString('hex')] = data;
    cb();
});

server.on('resumeSession', (id: Buffer, cb: (idx: null, session: Buffer) => void) => {
    cb(null, tlsSessionStore[id.toString('hex')] || null);
});


