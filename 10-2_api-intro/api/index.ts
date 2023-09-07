const PORT = 8003;
const server = Deno.listen({ port: PORT });
console.log(`Listening on ${PORT}`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // without awaiting the function
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    // The native HTTP server uses the web standard `Request` and `Response`
    // objects.
    const userAgent = requestEvent.request.headers.get("user-agent");

    if (userAgent === "PWST") {
      requestEvent.respondWith(
        new Response("Hello, PWST Student!")
      );
    } else {
      requestEvent.respondWith(
        new Response("I don't know you!", {
          status: 401
        })
      )
    }
  }
}