const next = require("next");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const { v4: uuidv4 } = require("uuid");
let onlineUsers = [];
const addUser = (username, socketId) => {
  const isExist = onlineUsers.find((user) => user.socketId === socketId);
  if (!isExist) {
    onlineUsers.push({ username, socketId });

    console.log(
      "[User added to the socket ]",
      username + " with id =>" + socketId
    );
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log("[User removed from the socket ]", socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // console.log("SERVER_CONNECTED", socket);
    // console.dir("SERVER_CONNECTED", socket);

    socket.on("NEW_USER", (username) => {
      addUser(username, socket.id);
    });

    socket.on("SEND_NOTIFICATION", ({ receiverUsername, data }) => {
      const receiver = getUser(receiverUsername);
      const data_incoming = {
        receiverUsername,
        data,
        id: uuidv4(),
      };
      console.log("IAM HERE");
      console.log("DATA_HERE", data_incoming);
      io.to(receiver.socketId).emit("GET_NOTIFICATION", {
        id: uuidv4(),
        ...data,
      });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
