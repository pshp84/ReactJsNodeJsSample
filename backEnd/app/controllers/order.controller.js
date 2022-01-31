const Order = require("../models/order.model");
const mongoose = require("mongoose");
//post order
// Create and Save a new User
exports.create = (req, res) => {
  const note = new Order({
    _id: mongoose.Types.ObjectId(),
    orderId: req.body.orderId,
    userId: req.body.userId,
    status: req.body.status,
    productStatus: req.body.productStatus,
    tableNo: req.body.tableNo,
    total: req.body.total,
    sar: req.body.sar,
    name: req.body.name,
    item: req.body.item,
    mobileNo: req.body.mobileNo,
  });

  // Save User in the database
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

/*exports.create = (req, res) => {
  // create item
  const note = new Order({
    _id: mongoose.Types.ObjectId(),
    /*No: req.body.No,
    status: req.body.status,
    date: req.body.date,
    sar: req.body.sar,
    productStatus: req.body.productStatus,
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    orderId: req.body.orderId,
    userId: req.body.userId,
    status: req.body.status,
    tableNo: req.body.tableNo,
    total: req.body.total,
    //items: req.body.items,
    //discounts: req.body.discounts,
    productStatus: req.body.productStatus,
  });
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating the order.",
      });
    });
};*/

//get order
exports.findAll = (req, res) => {
  Order.find()
    //.populate("items")
    //.populate("discounts")
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.update = (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    //.populate("items")
    //.populate("discounts")
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "no order found",
        });
      }
      res.status(200).send(order);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the order",
      });
    });
};

//get order by id
exports.findOne = (req, res) => {
  Order.findById(req.params.id)
    //.populate("items")
    //.populate("discounts")
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
