import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/mongo.db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(5001, async () => {
  await connectDB();
  console.log("listening to PORT: 5001");
});
