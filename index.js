import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/Router.js";
import {errorMiddleware} from "./validators/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 8009;
const app = express()


app.use(express.json());


app.use(cors({
  credentials: true,
  // regExpression berish kerak
  origin: "https://sunet.uz"
}));

app.use("/api", router);
app.use(errorMiddleware);


const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()
