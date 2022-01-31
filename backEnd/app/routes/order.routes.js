module.exports = (app) => {
  const order = require("../controllers/order.controller");

  app.post("/order", order.create);

  app.get("/order", order.findAll);

  app.put("/order/:id", order.update);

  app.get("/order/:id", order.findOne);
};
