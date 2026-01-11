import express from "express";

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Notes App API",
    status: "Ok",
  });
});

export default server;