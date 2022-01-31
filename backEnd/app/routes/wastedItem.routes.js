module.exports = (app) => {
  const wasteItem = require("../controllers/wastedItem.controller");

  app.post("/wasteItem", wasteItem.create);

  app.get("/wasteItem", wasteItem.findAll);

  app.get("/wasteItem/:id", wasteItem.findOne);

  app.put("/wasteItem/:id", wasteItem.update);

  app.delete("/wasteItem/:id", wasteItem.delete);

  //app.post("/register", register);
};
