module.exports = (app) => {
  const category = require("../controllers/category.controller");
  const { upload } = require("../middleware/upload");

  app.post("/category", upload.single("categoryImage"), category.create);

  app.get("/category", category.findAll);

  app.put("/category/:id", category.update);

  app.delete("/category/:id", category.delete);

  app.get("/category/:id", category.findOne);

  //app.get("/category", category.find);
};
