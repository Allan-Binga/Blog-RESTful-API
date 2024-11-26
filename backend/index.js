const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/users.js')

dotenv.config();
app.use(express.json())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB.")
}

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.listen("5000", () => {
    console.log("Backend up and running.")
})
