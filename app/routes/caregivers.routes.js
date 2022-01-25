const { caregivers } = require("../models/index.js");

module.exports = app => {

    const caregivers = require("../controllers/caregiver.controller.js");

    var caregivers_router = require("express").Router();

    caregivers_router.post("/", caregivers.create);
    caregivers_router.get("/", caregivers.findAll);
    caregivers_router.get("/enabled", caregivers.findAllEnabled);
    caregivers_router.get("/:id", caregivers.findOne);
    caregivers_router.put("/:id", caregivers.update);
    caregivers_router.delete("/:id", caregivers.delete);
    caregivers_router.delete("/", caregivers.deleteAll);

    app.use('/api/caregivers', caregivers_router);
  };