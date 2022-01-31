const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createJWT = require("../middleware/auth");
//sign up for user
//const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signup = (req, res, next) => {
  let { username, email, password, password_confirmation } = req.body;

  Auth.findOne({ email: email })
    .then((auth) => {
      if (auth) {
        return res
          .status(422)
          .json({ errors: [{ auth: "email already exists" }] });
      } else {
        const auth = new Auth({
          username: username,
          email: email,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            auth.password = hash;
            auth
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

// login
exports.login = (req, res) => {
  let { email, password } = req.body;
  Auth.findOne({ email: email })
    .then((auth) => {
      if (!auth) {
        return res.status(404).json({
          errors: [{ auth: "not found" }],
        });
      } else {
        bcrypt
          .compare(password, auth.password)
          .then(async (isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "incorrect" }] });
            }

            let token = createJWT(auth.email, auth._id, 3600);

            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
              if (err) {
                res.status(500).json({ error: "error during login" });
              }
              if (decoded) {
                return res.status(200).json({
                  success: true,
                  token: token,
                  message: auth,
                });
              }
            });
          })
          .catch((err) => {
            res.status(500).json({
              err: err,
              message: "not login",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "not accessed" });
    });
};

/*exports.login = (req, res) => {
  const { email, password } = req.body;
  Auth.find({ email: email })
    .exec()
    .then((auth) => {
      if (auth.length < 1) {
        res.status(404).json({ message: "Auth failed" });
      } else {
        bcrypt.compare(req.body.password, auth[0].password, function (
          err,
          result
        ) {
          if (err) {
            res.status(404).json({ message: "Auth failed" });
          }
          if (result) {
            var token = jwt.sign(
              {
                email: auth[0].email,
                authid: auth[0]._id,
              },
              "secret",
              {
                expiresIn: "1h",
              }
            );
            res.status(201).json({
              //message: "User found",
              token: token,
              message: auth,
            });
          } else {
            res.status(404).json({ message: "Auth failed" });
          }
        });
      }
    })
    .catch((err) => {
      res.json({ error: err });
    });
};*/
