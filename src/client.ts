import tls = require("tls");
import fs = require("fs");
import path = require("path");

let counter = 0;

export const make_client = new Promise<Buffer>((resolve: any, reject: any) => {
  let port = 8000
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
    };
  });

  conn.on("session", (session: Buffer | undefined) => {
    conn.end();
    resolve(session)
  });
});
