const express = require("express");
const mongoose = require("mongoose");
const propertyRouters = require("./routes/propertyRouter.js");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/login.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", propertyRouters);
app.use("/", loginRoutes);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://random:random123@cluster0.w0bqo42.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Database Connected");
}

app.listen(port, () => {
  console.log("Server running on port 5000");
});
