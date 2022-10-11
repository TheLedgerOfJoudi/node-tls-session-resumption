import tls = require('tls')
import fs = require('fs')
import path = require('path')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var session_buffer: Buffer | undefined;

const options: tls.ConnectionOptions = {
    port: 8000,
    key: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/private-key.pem')),
    cert: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/public-cert.pem')),
};

var conn: tls.TLSSocket = tls.connect(options, function () {
    if (conn.authorized) {
        console.log("Connection authorized by a Certificate Authority.");
    } else {
        console.log("Connection not authorized: " + conn.authorizationError)
    }
    console.log();
});

conn.on("data", function (data: Buffer | undefined) {
    console.log(data.toString());
    conn.on('session', (session: Buffer | undefined) => {
        session_buffer = session;
        conn.end();
        const options: tls.ConnectionOptions = {
            port: 8000,
            session: session_buffer,
            key: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/private-key.pem')),
            cert: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/public-cert.pem')),
        };
        tls.connect(options, function () {
            console.log("resumed")
        });
    });
});




