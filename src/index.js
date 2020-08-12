const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const ifEquality = require("./views/helpers/ifEquality");
const { usersRouter, getAllFriends } = require("./routes/usersRouter");
const auth = require("./middleware/auth");
const passiveAuth = require("./middleware/passiveAuth");
const authenticate = require("./middleware/authenticate");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// handlebars setup
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// api's
app.get("/", passiveAuth, (request, response) => {
  response.status(200).render("home", {
    layout: "hero",
    title: "Home",
    isAdmin: request.jwt ? request.jwt.sub === "admin" : false
  });
});

app.get("/login", authenticate, (request, response) => {
  response.status(200).render("adminLogin.hbs", {
    layout: "login",
    title: "Admin",
    submitTarget: "/api/admin/login",
    submitMethod: "POST",
    formTitle: "Login"
  });
});

app.get("/friends", auth, async (request, response) => {
  try {
    response.status(200).render("friends.hbs", {
      layout: "navigation",
      title: "friends",
      data: await getAllFriends()
    });
  } catch (e) {
    console.log(e);
    response.status(500).send("Internal Server error");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

app.use("/api/admin", usersRouter);

// port setup
app.listen(8080, () => {
  console.log("server running");
});
