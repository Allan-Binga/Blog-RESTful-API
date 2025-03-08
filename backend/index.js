const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const postRoute = require("./routes/posts.js");
const categoryRoute = require("./routes/categories.js");

dotenv.config();

//Middleware
app.use(express.json());
app.use(cookieParser());

main().catch((err) => console.log(err));

//Database connection function
async function main() {
  try {
    // Load the variable and attempt a login.
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    // Log any connection errors
    console.log("MongoDB connection error:", err);
  }
}

//Routes - Auth, Users, Posts, Categories
app.use("/byteblog/v1/auth", authRoute);
app.use("/byteblog/v1/users", userRoute);
app.use("/byteblog/v1/posts", postRoute);
app.use("/byteblog/v1/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend up and running.");
});
