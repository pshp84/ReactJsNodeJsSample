const { check, validationResult } = require("express-validator");
const Auth = require("../controllers/auth.controller");
exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.status(422).json({ success: false, error: error });
  }
  next();
};
exports.userValidator = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is Required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be 3 to 20 characters long"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  /*.custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        User.findOne({ Email: req.body.Email }, function (err, users) {
          if (err) {
            reject(new Error("Server Error"));
          }
          if (Boolean(users)) {
            reject(new Error("E-mail already in use"));
          }
          resolve(true);
        });
      });
    }),*/

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 3 })
    .withMessage("Password must be Atleast 3  characters long"),
];
