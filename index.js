const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL  || "mongodb+srv://shubham:shubham@cluster0.mf0sojx.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT , () => {
  console.log("Backend is running.");
});
