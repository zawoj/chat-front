const express = require("express");
const router = express.Router();
const validateForm = require("./validateForm");
const pool = require("../../db");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  validateForm(req, res);
  console.log("login route hit");
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [req.body.username],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length === 0) {
        return res.status(422).send("Incorrect data");
      }
      const user = result.rows[0];
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (isMatch) {
          req.session.user = {
            username: user.username,
            id: user.id,
          };

          res.status(200).send({
            username: user.username,
            id: user.id,
            loggedIn: true,
          });
        } else {
          res.status(422).send("Incorrect data");
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
    return res.status(422).send("User with this username already exists");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username",
    [req.body.username, hashedPassword]
  );
  res
    .status(201)
    .send(`User ${newUser.rows[0].username} successfully created!`, {
      username: newUser.rows[0].username,
      id: newUser.rows[0].id,
      loggedIn: true,
    });
});

module.exports = router;
