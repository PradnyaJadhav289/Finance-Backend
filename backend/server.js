
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";
import recordRoute from "./routes/record.route.js";
import userRoute from "./routes/user.Route.js";
import summaryRoute from "./routes/summary.route.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();


app.use('/records', recordRoute);
app.use('/users', userRoute);
app.use('/summary',summaryRoute);

app.get("/", (req, res) => {
  res.send("Finance Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});