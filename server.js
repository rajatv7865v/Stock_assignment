import express from "express";
import { APP_PORT, DBURL } from "./config/index.js";
import route from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", route);

//Database connection
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});

app.listen(APP_PORT, () => {
  console.log(`server is running on port ${APP_PORT}`);
});
