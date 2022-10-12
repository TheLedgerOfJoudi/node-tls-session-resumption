import tls = require("tls");
import fs = require("fs");
import path = require("path");
import { make_client } from "./client"

export const resume_session = new Promise<true>(async (resolve: any, reject: any) => {
    let session_buffer = await make_client
    let port = 8000
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
    var conn: tls.TLSSocket = tls.connect(options, function () {
        resolve(true)
        conn.destroy();
    });
});
