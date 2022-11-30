const express = require("express");
const mongoose = require("mongoose");
const propertyRouters = require("./routes/propertyRouter.js");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/login.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use("/", propertyRouters);
app.use("/", loginRoutes);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://nitwrohit12345:Rohit12345@cluster0.tykoybn.mongodb.net/stackproject?retryWrites=true&w=majority"
  );
  console.log("Database Connected");
}

console.log("Connected to database");

app.listen(port, () => {
  console.log("Server running on port 5000");
});
