const Item = require("../models/item.model.js");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//post item
/*exports.create = (req, res) => {
  // creating obj
  //console.log(JSON.stringify(req.file));
  var obj = {
    _id: mongoose.Types.ObjectId(),
    itemNo: req.body.itemNo,
    itemName: req.body.itemName,
    description: req.body.description,
    sarPrice: req.body.sarPrice,
    otherItem: req.body.otherItem,
    itemId: req.body.itemId,
    category: req.body.category,
    photo: req.file.filename,
    photoBuffer: {
      data: fs.readFileSync(path.join("./upload/" + req.file.filename)),
      contentType: "image/jpg",
    },
  };

  let name;
  const note = new Item(obj);
  note
    .save()
    .then((data) => {
      name = req.file.filename;
      data.photo = { name };
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating the Item.",
      });
    });
};*/

//create and save item
exports.create = (req, res) => {
  // create item

  const note = new Item({
    _id: mongoose.Types.ObjectId(),
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    //photo: req.body.photo,
  });

  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item.",
      });
    });
};

//get all item from database

exports.findAll = (req, res) => {
  Item.find()
    .populate("category")
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};
//get image by id
// Find a single Item with a id

exports.findOne = (req, res) => {
  Item.findById(req.params.id)
    .populate("category")
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

//update item
exports.update = (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => {
      if (!item) {
        return res.status(404).send({
          message: "no item found",
        });
      }
      res.status(200).send(item);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the item",
      });
    });
};

//delete item
exports.delete = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Item not found with id " + req.params.id,
        });
      }
      res.send({ message: "Item deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Item not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete Item with id " + req.params.id,
      });
    });
};
