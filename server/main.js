// console.log("Testing server hahahahah")
const express = require("express")
const app = express()
const PORT = 5001

// create Root Route
// GET, POST, DELETE, PUT, PATCH
app.get("/", (req, res) => {
    res.send("Hello world - Welcome to our server")
})

app.get("/login", (req, res) => {
    res.send("Welcome to Login page")
})

app.listen(PORT, () => console.log(`Server Running on ${PORT}`))