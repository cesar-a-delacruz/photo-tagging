import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import auth from "./utils/auth.js";
import authenticationMiddleware from "./middlewares/authenticationMiddleware.js";
import refreshMiddleware from "./middlewares/refreshMiddleware.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT }));
passport.use(auth.strategy);

app.post("/auth", authenticationMiddleware);
app.get("/refresh/:id", refreshMiddleware);

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
