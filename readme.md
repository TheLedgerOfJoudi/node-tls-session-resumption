# node-tls-session-resumption

A TLS session resumption implementation using Node TLS/SSL.

## To reproduce:

0 - Make sure you have OpenSSL installed, visit https://www.openssl.org/ if not, and `npm install`.

1 - Run `bash generate_certs.sh`, this generates a self-signed SSL certificate. You will be prompted to fill some fields for CSR.

2 - Run `npm run build`.

3 - Run `node built/server.js`

4 - Run `openssl s_client -connect 127.0.0.1:8000 -reconnect`; to make sure server is up and allows reconnecting.

5 - Run `npm run test`.


