module.exports = (app) => {
  const { login, signup } = require("../controllers/auth.controller");
  const {
    userValidationResult,
    userValidator,
  } = require("../middleware/validate");

  app.post("/signup", userValidationResult, userValidator, signup);

  app.post("/login", login);
};
