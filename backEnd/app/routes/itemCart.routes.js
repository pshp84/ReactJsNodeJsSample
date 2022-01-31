module.exports = (app) => {
  const itemCart = require("../controllers/itemCart.controller");

  app.post("/itemCart", itemCart.create);
};
