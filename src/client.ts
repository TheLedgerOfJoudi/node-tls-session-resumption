import tls = require("tls");
import fs = require("fs");
import path = require("path");

let counter = 0;

export const make_client = new Promise<boolean>((resolve: any, reject: any) => {
  var session_buffer: Buffer | undefined;
  let port = 8000
//   var resumed: boolean = false;
  const options: tls.ConnectionOptions = {
    port: port,
    rejectUnauthorized: false,
    key: fs.readFileSync(
      path.normalize(__dirname + "/../cert" + "/private-key.pem")
    ),
    cert: fs.readFileSync(
      path.normalize(__dirname + "/../cert" + "/public-cert.pem")
    ),
  };

  var conn: tls.TLSSocket = tls.connect(options, function () {
    if (conn.authorized) {
      console.log("Connection authorized by a Certificate Authority.");
    } else {
      console.log("Connection not authorized: " + conn.authorizationError);
    }
    console.log();
  });

  conn.on("session", (session: Buffer | undefined) => {
    session_buffer = session;
    conn.end();
    const options: tls.ConnectionOptions = {
      port: port,
      rejectUnauthorized: false,
      session: session_buffer,
      key: fs.readFileSync(
        path.normalize(__dirname + "/../cert" + "/private-key.pem")
      ),
      cert: fs.readFileSync(
        path.normalize(__dirname + "/../cert" + "/public-cert.pem")
      ),
    };
    var conn2: tls.TLSSocket = tls.connect(options, function () {
      console.log("resumed");
      counter += 1
      console.log('counter is', counter);
      if (counter == 2){
        console.log('ended');
        resolve(true);
        conn2.end();
        conn2.destroy();
        conn.destroy();
      }
    });
  });
});
