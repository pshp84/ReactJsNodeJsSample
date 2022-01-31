const Category = require("../models/category.model.js");
const fs = require("fs");
const path = require("path");

//create and save item
exports.create = (req, res) => {
  // creating obj
  //console.log(JSON.stringify(req.file));
  //res.send(categoryImage_url);
  //req.file.path;
  var obj = {
    categoryName: req.body.categoryName,
    description: req.body.description,
    categoryImage: `http://localhost:8081/upload/${req.file.filename}`,
    price: req.body.price,
    categoryImage_url: `http://localhost:8081/upload/${req.file.filename}`,
    categoryImageBuffer: {
      data: fs.readFileSync(path.join("./upload/" + req.file.filename)),
      contentType: "image/jpg",
    },
  };

  /*res.json({
    success: 1,
    categoryImage_url: `http://localhost:8081/categoryImage/${req.file.filename}`,
  });*/

  // {
  //   categoryName: req.body.categoryName,
  //   description: req.body.description,
  //   categoryImage: req.file.originalname,
  // }
  // create category
  let name;
  const note = new Category(obj);
  // console.log(`this one is file ${JSON.stringify(req.file)}`);
  note
    .save()
    .then((data) => {
      name = req.file.path;
      data.categoryImage = { data };
      res.send(data);
      //res.send(categoryImage_url);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
//get all category from database
exports.findAll = (req, res) => {
  Category.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single category with a id
exports.findOne = (req, res) => {
  Category.findById(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.id,
      });
    });
};

//update category
exports.update = (req, res) => {
  let _id = req.params.id;
  var updatedObj = {
    categoryName: req.body.categoryName,
    description: req.body.description,
    categoryImage: req.file.filename,
    categoryImageBuffer: {
      data: fs.readFileSync(path.join("./upload/" + req.file.filename)),
      contentType: "image/jpg",
    },
  };

  Category.findByIdAndUpdate(_id, updatedObj, { new: true })
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "no category found",
        });
      }
      res.status(200).send(category);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the category",
      });
    });
};

//delete category
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.id,
        });
      }
      res.send({ message: "Category deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete Category with id " + req.params.id,
      });
    });
};

/*const Category = require("../models/category.model.js");
const fs = require("fs");
const path = require("path");

//create and save item

exports.create = (req, res) => {
  // creating obj
  console.log(JSON.stringify(req.file));
  var obj = {
    categoryName: req.body.categoryName,
    description: req.body.description,
    categoryImage: req.file.filename,
    categoryImageBuffer: {
      data: fs.readFileSync(path.join("./upload/" + req.file.filename)),
      contentType: "image/jpg",
    },
  };
  // {
  //   categoryName: req.body.categoryName,
  //   description: req.body.description,
  //   categoryImage: req.file.originalname,
  // }
  // create category
  let name;
  const note = new Category(obj);

  // console.log(`this one is file ${JSON.stringify(req.file)}`);
  note
    .save()
    .then((data) => {
      name = req.file.filename;
      data.categoryImage = { name };
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

//get all category from database

exports.findAll = (req, res) => {
  Category.find()
    .then((data) => {
      name = req.body.filename;
      data.categoryImage = { name };
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving category.",
      });
    });
};
// Find a single category with a id
exports.findOne = (req, res) => {
  Category.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id,
        });
      }
      name = req.body.filename;
      data.categoryImage = { name };
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.id,
      });
    });
};

//update category
exports.update = (req, res) => {
  let _id = req.params.id;
  var updatedObj = {
    categoryName: req.body.categoryName,
    description: req.body.description,
    categoryImage: req.file.filename,
    categoryImageBuffer: {
      data: fs.readFileSync(path.join("./upload/" + req.file.filename)),
      contentType: "image/jpg",
    },
  };

  Category.findByIdAndUpdate(_id, updatedObj, { new: true })
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "no category found",
        });
      }
      res.status(200).send(category);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the category",
      });
    });
};

//delete category
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.id,
        });
      }
      res.send({ message: "Category deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete Category with id " + req.params.id,
      });
    });
};*/
