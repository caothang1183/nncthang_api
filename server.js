const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const dbHelper = require("./helper/db_helper");
const routers = require("./routes/index");
const passport = require("passport");
const passport_config = require('./config/passport')
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 4000;

dbHelper.connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport_config(passport);
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.current_user = req.flash('current_user');
    res.locals.error = req.flash('error');
    next();
});
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(routers);

app.listen(PORT, console.log(`Server start on port ${PORT}`));
