const Discount = require("../models/discount.model");

//post method
exports.create = (req, res) => {
  //post data
  const note = new Discount({
    discountId: req.body.discountId,
    discountType: req.body.discountType,
  });
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "something went wrong",
      });
    });
};

//get
exports.findAll = (req, res) => {
  Discount.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};
