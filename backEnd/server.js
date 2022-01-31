const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// create express app
const app = express();

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/upload", express.static("upload"));
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());
app.use("/category", express.static("/category"));

// ... Your routes and methods here
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    //useFindAndModify: false,
    //useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

require("./app/routes/user.routes.js")(app);
require("./app/routes/category.route.js")(app);
require("./app/routes/item.routes.js")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/discount.routes")(app);
require("./app/routes/wastedItem.routes.js")(app);

// listen for requests
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
