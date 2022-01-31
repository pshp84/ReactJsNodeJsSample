module.exports = (app) => {
  const discount = require("../controllers/discount.controller");

  app.post("/discount", discount.create);

  app.get("/discount", discount.findAll);
};
