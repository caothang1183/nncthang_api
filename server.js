const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const dbHelper = require("./helper/db_helper");
const routers = require("./routes/index");
const routers_api = require("./routes/index_api");
const passport = require("passport");
const passport_config = require("./config/passport");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 4000;
const IP = process.env.IP || "localhost";

// Connect to MongoDB
dbHelper.connectMongoDB();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// ========== DashBoard API ==========

// engine to display page
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use("/assets/", express.static("public/assets/"));

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);

// authentication by passport
app.use(passport.initialize());
app.use(passport.session());
passport_config(passport);

// flash to cache message
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.current_user = req.flash("current_user");
    res.locals.error = req.flash("error");
    next();
});

// routers for dashboard
app.use("/", routers);

// ========== API ==========
// router for api
app.use("/api", routers_api);
app.get("/api/*", (req, res) => {
    res.status(405).json({
        message: "Not Permittion",
        description: "Login to get permittion"
    });
});

// error router not exist
app.get("/*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
        description: "Page not found"
    });
});
// run server
app.listen(PORT, console.log(`Server start on port ${IP}:${PORT}`));
