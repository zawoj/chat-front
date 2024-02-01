const express = require("express");
const router = express.Router();
const validateForm = require("./validateForm");
const pool = require("../../db");
const bcrypt = require("bcrypt");

// get me
router.get("/me", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.status(200).json({
      user: {
        username: req.session.user.username,
        id: req.session.user.id,
      },
      loggedIn: true,
    });
    return;
  }
  res.status(401).json({
    message: "Not logged in",
    loggedIn: false,
  });
});

router.post("/login", async (req, res) => {
  validateForm(req, res);
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [req.body.username],
    (err, result) => {
      if (err) {
        return res.status(500).send({
          message: "Server error",
          loggedIn: false,
        });
      }
      if (result.rows.length === 0) {
        return res.status(422).send({
          message: "Incorrect data",
          loggedIn: false,
        });
      }
      const user = result.rows[0];
      bcrypt.compare(req.body.password, user.passhash, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (isMatch) {
          req.session.user = {
            username: user.username,
            id: user.id,
          };

          res.status(200).send({
            user: {
              username: user.username,
              id: user.id,
            },
            loggedIn: true,
          });
        } else {
          res.status(422).send({
            message: "Incorrect data",
            loggedIn: false,
          });
        }
      });
    }
  );
});

router.post("/signup", async (req, res) => {
  validateForm(req, res);

  const existingUser = await pool.query(
    "SELECT username FROM users WHERE username = $1",
    [req.body.username]
  );

  if (existingUser.rows.length > 0) {
    return res.status(422).send({
      message: "Username already exists",
      loggedIn: false,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await pool.query(
    "INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING username, id",
    [req.body.username, hashedPassword]
  );

  req.session.user = {
    username: newUser.rows[0].username,
    id: newUser.rows[0].id,
  };

  res.status(201).json({
    message: `User ${newUser.rows[0].username} successfully created!`,
    user: {
      username: newUser.rows[0].username,
      id: newUser.rows[0].id,
    },
    loggedIn: true,
  });
});

module.exports = router;
