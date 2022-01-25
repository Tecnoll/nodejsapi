const db = require("../models");
const CareGiver = db.caregiver;

exports.create = (request, response) => {
    if (!request.body.name) {
      response.status(400).send({ message: "CareGiver name can not be empty" });
      return;
    }
  
    const caregiver = new CareGiver({
      name: request.body.title,
      age:request.body.age,
      email:request.body.emali,
      description: request.body.description,
      enabled: req.body.active ? req.body.active : false
    });
  
    caregiver
      .save(caregiver)
      .then(data => {
        response.send(data);
      })
      .catch(err => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the CareGiver."
        });
      });
  };

exports.findAll = (request, response) => {
    const name = request.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    CareGiver.find(condition)
      .then(data => {
        response.send(data);
      })
      .catch(err => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

exports.findOne = (request, response) => {
    const id = request.params.id;
  
    CareGiver.findById(id)
      .then(data => {
        if (!data)
          response.status(404).send({ message: "Not found CareGiver with id " + id });
        else response.send(data);
      })
      .catch(err => {
        response
          .status(500)
          .send({ message: "Error retrieving CareGiver with id=" + id });
      });
  };

exports.update = (request, response) => {
    if (!request.body) {
      return response.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = request.params.id;
  
    CareGiver.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          response.status(404).send({
            message: `Cannot update CareGiver with id=${id}. Maybe CareGiver was not found!`
          });
        } else response.send({ message: "CareGiver was updated successfully." });
      })
      .catch(err => {
        response.status(500).send({
          message: "Error updating CareGiver with id=" + id
        });
      });
  };

exports.delete = (request, response) => {
    const id = request.params.id;
  
    CareGiver.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          response.status(404).send({
            message: `Cannot delete CareGiver with id=${id}. Maybe CareGiver was not found!`
          });
        } else {
          response.send({
            message: "CareGiver was deleted successfully!"
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete CareGiver with id=" + id
        });
      });
  };

exports.deleteAll = (request, response) => {
    CareGiver.deleteMany({})
      .then(data => {
        response.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

exports.findAllEnabled = (request, response) => {
    CareGiver.find({ enabled: true })
      .then(data => {
        response.send(data);
      })
      .catch(err => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };