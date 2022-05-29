import express, { Application } from "express";

const PORT = 8001;
const app: Application = express();


app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});