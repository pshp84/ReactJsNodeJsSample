const wasteItem = require("../models/wastedItem.model");

// Create and Save a new waste item
exports.create = (req, res) => {
  //Create a waste item
  const note = new wasteItem({
    itemId: req.body.itemId,
    itemName: req.body.itemName,
    totalItems: req.body.totalItems,
    wasteItem: req.body.wasteItem,
    reason: req.body.reason,
  });

  // Save waste item in the database
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the waste item.",
      });
    });
};

// Retrieve and return all waste item from the database.
exports.findAll = (req, res) => {
  wasteItem
    .find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving waste item.",
      });
    });
};
// Find a single waste item with a id
exports.findOne = (req, res) => {
  wasteItem
    .findById(req.params.id)
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
// Update a waste item identified by the id in the request
exports.update = (req, res) => {
  wasteItem
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((wasteItem) => {
      if (!wasteItem) {
        return res.status(404).send({
          message: "no user found",
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the post",
      });
    });
};
// Delete waste item with the specified id in the request
exports.delete = (req, res) => {
  wasteItem
    .findByIdAndRemove(req.params.id)
    .then((note) => {
      // if(!note) {
      //return res.status(404).send({
      //    message: "User not found with id " + req.params.id
      //});
      // }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.id,
      });
    });
};
