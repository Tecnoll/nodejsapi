const { users } = require("../models/index.js");

module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var users_router = require("express").Router();

    users_router.post("/", users.create);
    users_router.get("/", users.findAll);
    users_router.get("/active", users.findAllActive);
    users_router.get("/:id", users.findOne);
    users_router.put("/:id", users.update);
    users_router.delete("/:id", users.delete);
    users_router.delete("/", users.deleteAll);

    app.use('/api/users', users_router);
};