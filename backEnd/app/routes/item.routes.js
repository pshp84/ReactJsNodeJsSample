module.exports = (app) => {
  const item = require("../controllers/item.controller.js");
  const { upload } = require("../middleware/upload");

  app.post("/item", upload.single("photo"), item.create);

  app.put("/item/:id", item.update);

  app.get("/item", item.findAll);

  app.delete("/item/:id", item.delete);

  app.get("/item/:id", item.findOne);

  //app.get("/photo/:id",item.findOne)
};
