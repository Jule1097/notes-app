import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.router.js";
import userRouter from "./routes/user.router.js";

const server = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  credentials: true,
};

server.use(cors(corsOptions));

server.use(express.json());

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Notes App API",
    status: "Ok",
  });
});

server.use('/auth', userRouter);
server.use('/api', notesRouter);

export default server;