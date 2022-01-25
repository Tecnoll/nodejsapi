const db = require("../models");
const User = db.user;

exports.create = (request, response) => {
    if (!request.body.name) {
      response.status(400).send({ message: "User name can not be empty" });
      return;
    }
  
    const user = new User({
      name: request.body.title,
      age:request.body.age,
      email:request.body.emali,
      description: request.body.description,
      active: req.body.active ? req.body.active : false
    });
  
    user
      .save(user)
      .then(data => {
        response.send(data);
      })
      .catch(err => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

exports.findAll = (request, response) => {
    const name = request.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    User.find(condition)
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
  
    User.findById(id)
      .then(data => {
        if (!data)
          response.status(404).send({ message: "Not found User with id " + id });
        else response.send(data);
      })
      .catch(err => {
        response
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
  };

exports.update = (request, response) => {
    if (!request.body) {
      return response.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = request.params.id;
  
    User.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          response.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else response.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        response.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

exports.delete = (request, response) => {
    const id = request.params.id;
  
    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          response.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          response.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

exports.deleteAll = (request, response) => {
    User.deleteMany({})
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

exports.findAllActive = (request, response) => {
    User.find({ active: true })
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