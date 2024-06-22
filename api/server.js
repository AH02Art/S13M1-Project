const express = require("express");
const User = require("./users/model.js");

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.post("/api/users", (request, response) => {
    const { name, bio } = request.body;
    console.log("POST request body: ", request.body);
    User.insert({ name, bio })
    .then((data) => {
        if (!data.name || !data.bio) {
            response.status(400).json({
                message: "Please provide name and bio for the user"
            });
        } else {
            response.status(201).json(data);
        }
    })
    .catch((error) => {
        response.status(500).json({
            message: "error FETCHing user by id",
            error: error.message
        });
    })
});

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
    User.findById(id)
        .then((data) => {
            if (!data) {
                response.status(404).json({ message: "The user with the specified ID does not exist" })
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

app.delete("/api/users/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const possibleUser = await User.findById(id);
        if (!possibleUser) {
            response.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            const deletedUser = await User.remove(possibleUser.id);
            response.status(200).json(deletedUser);
        } 
    } catch (error) {
        response.status(500).json({
            message: "error DELETing user by id",
            error: error.message
        })
    }
});

app.put("/api/users/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const { name, bio } = request.body;
        const possibleUser = await User.findById(id);
        if (!possibleUser) {
            response.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            if ( !name || !bio ) {
                response.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                const updatedUser = await User.update(id, { name, bio });
                response.status(200).json(updatedUser);
            }
        }
    } catch (error) {
        response.status(500).json({
            message: "error PUTing user by id",
            error: error.message
        })        
    }
})

module.exports = app;