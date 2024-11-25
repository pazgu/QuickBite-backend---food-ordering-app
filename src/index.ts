import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import restaurantRoute from "./routes/RestautantRoute";
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

//Indicating that the server is healthy.
//useful for monitoring and ensuring that server is running as expected
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", userRoute);
app.use("/api/my/restaurant", restaurantRoute);

app.listen(3000, () => {
  console.log("Server started on localhost:3000");
});
