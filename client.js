const tls = require('tls')
const fs = require('fs')
const path = require('path')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var session_buffer;

var options = {
    session: null,
    key: fs.readFileSync(path.join(__dirname, 'cert', 'private-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'public-cert.pem')),
};

var conn = tls.connect(8000, options, function () {
    if (conn.authorized) {
        console.log("Connection authorized by a Certificate Authority.");
    } else {
        console.log("Connection not authorized: " + conn.authorizationError)
    }
    console.log();
});

conn.on("data", function (data) {
    console.log(data.toString());
    conn.on('session', (session) => {
        session_buffer = session;
        conn.end();
        tls.connect(8000, {
            session: session_buffer,
            key: fs.readFileSync(path.join(__dirname, 'cert', 'private-key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert', 'public-cert.pem')),
        }, function () {
            console.log("resumed")
        });
    });
});




