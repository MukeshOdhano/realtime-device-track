const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const PORT = 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

io.on("connection", (socket) => {
	socket.on("send-location", (data) => {
		io.emit("receive-location", {
			id: socket.id,
			...data,
		});
	});

	socket.on("disconnect", function () {
		io.emit("user-disconnect", socket.id);
	});
});

app.get("/", function (req, res) {
	res.render("home");
});

server.listen(PORT, () => {
	console.log("server is listning on PORT: " + PORT + "\n");
});
