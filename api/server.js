const express = require("express");
const User = require("./users/model.js");

const app = express();
app.disable("x-powered-by");

app.get("/api/users", (request, response) => {
    User.find()
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((error) => {
            response.status(500).json({
                message: "The users information could not be retrieved",
                error: error.message,
                stack: error.stack
            });
        })
});

app.get("/api/users/:id", (request, response) => {
    const { id } = request.params;
    console.log("ID: ", id);
    User.findById(id)
        .then((data) => {
            if (!data) {
                response.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                response.status(200).json(data);
            }
        })
        .catch((error) => {
            response.status(500).json({
                message: "error FETCHing user by id",
                error: error.message
            })
        })
});

module.exports = app;