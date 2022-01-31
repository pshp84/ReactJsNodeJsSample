const itemCart = require("../models/itemCart.model");

exports.create = (req, res) => {
  const note = new itemCart({
    item: req.body.item,
    discount: req.body.discount,
  });
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "something went wrong while creating itemCart",
      });
    });
};
