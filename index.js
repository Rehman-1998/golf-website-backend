const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const ErrorMiddleware = require("./middleware/errormiddleware");
//routes
const userRoute = require("./Routes/userRoute");
const profileRoute = require("./Routes/profileRoute");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
dotenv.config();

connectDB();

const server = http.createServer(app);
// const io = socketio(server);

const io = socketio(server, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "http://localhost:3000",
    },
  },
});

const botName = "ChatCord Bot";

//Run when client connects
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    //broadcast when user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    //send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      //send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.use(express.json());
app.use(cors());
//bodyparser middleware
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Api Working");
});

// routes
app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.errorHandler);

server.listen(port, () => {
  console.log(`server is running on ${port} port`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
