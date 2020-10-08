const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
var session = require("express-session");
var cors = require("cors");
var mongoose = require("mongoose");

var apiRouter = require("./router/apiRouter");
//mogoose connect
mongoose
  .connect(
    "mongodb+srv://root:1234@cluster0.mdxaz.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Succesfully connected to mongodb"))
  .catch((error) => console.log(error));

// Constants
const PORT = 8800;
const HOST = "0.0.0.0";

// initialize session
app.use(
  session({
    secret: "ProductDapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// use static file
app.use(express.static(path.join(__dirname, "public")));
// configure app to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(apiRouter);
// app.get("/sample", (req, res) => {
//   console.log("접속성공");
//   res.render("mainPage", { title: req.body.hello });
// });
// app.get("/hi", (req, res) => {
//   res.send("hh");
// });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
