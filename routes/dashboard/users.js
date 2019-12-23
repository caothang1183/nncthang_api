const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { forwardAuthenticated } = require("../../config/auth");

router.get("/login", forwardAuthenticated, (_req, res) => {
  res.render("login");
});

router.get("/register", forwardAuthenticated, (_req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { username, email, fullname, password, confirmPassword } = req.body;
  let errors = [];

  if (!username || !email || !password || !confirmPassword) {
    errors.push({ massage: "Please fill in required fields" });
  }
  if (password != confirmPassword) {
    errors.push({ massage: "Passwords do not match" });
  }
  if (password.length < 6 || password.length >= 15) {
    errors.push({ massage: "Passwords are limited to 6 to 15 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      email,
      fullname,
      password,
      confirmPassword
    });
  } else {
    User.findOne({ username: username }).then(user => {
      if (user) {
        errors.push({massage : "Account's already exist"});
        res.render("register", {
          errors,
          username,
          email,
          fullname,
          password,
          confirmPassword
        });
      } else {
        const newUser = new User({ username, email, fullname, password });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash("success_msg", "Register successfully");
                req.flash("current_user", user.username);
                res.redirect("/users/login");
              })
              .catch(errors => console.error(errors));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
module.exports = router;
