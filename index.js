const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT_NO || 8080, () => {
  console.log(`Server is listening now on port ${process.env.PORT_NO}`);
});
