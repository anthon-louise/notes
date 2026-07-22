import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());


app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
})
