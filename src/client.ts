import tls = require('tls')
import fs = require('fs')
import path = require('path')


export const make_client = async (port: number) => {
    var session_buffer: Buffer | undefined;
    var resumed: boolean = false;
    const options: tls.ConnectionOptions = {
        port: port,
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

    conn.on('session', (session: Buffer | undefined) => {
        session_buffer = session;
        conn.end();
        const options: tls.ConnectionOptions = {
            port: port,
            session: session_buffer,
            key: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/private-key.pem')),
            cert: fs.readFileSync(path.normalize(__dirname + '/../cert' + '/public-cert.pem')),
        };
        tls.connect(options, function () {
            console.log("resumed")
            resumed = true
        });
    });
    return resumed

}

