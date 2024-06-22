const express = require("express");
const User = require("./users/model.js");

const app = express();
app.disable("x-powered-by");

app.get("/api/users", (request, response) => {
    User.find()
        .then((data) => {
            response.status(200).json(data);
            console.log(data);
        })
        .catch((error) => {
            response.status(500).json({
                message: "error FETCHing users",
                error: error.message,
                stack: error.stack
            });
        })
});

app.get("/api/users/:id", (request, response) => {
    const { id } = request.params;
    User.findById(id)
        .then((data) => {
            response.json(data);
        })
        .catch((error) => {
            response.status(500).json({
                message: "error FETCHing user by id",
                error: error.message
            })
        })
});

module.exports = app;