import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import noteRouter from "./modules/notes/routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/notes", noteRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
})
