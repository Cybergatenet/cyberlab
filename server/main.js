// console.log("hello world")
const express = require("express");
const app = express()
const PORT = 5005
const bodyParsar = require("body-parser");
const PATH = require("path")

// middleware
// app.use(express.static("public"))
app.use(express.static(PATH.join(__dirname, "public")))
// app.use(bodyParsar.json())
// app.use(express.json()) // modern API like React or Vue 
app.use(bodyParsar.urlencoded({ extended: false }))



// Route: Home Route
app.get("/", (req, res) => {
    // Backend
    // res.send("Hello World")

    // REST-API
    res.json({ payload: [1,2,3,4] })
})

// Route: Login
app.get("/login", (req, res) => {
    res.send("Welcome to Dashboard")
})

app.post("/login", (req, res) => {
    res.send("Data Recieved")

    // object destructuring
    const { email, pwd } = req.body

    console.log(email, pwd);

    // console.log(req);
      
})


app.listen(PORT, () => console.log(`Server running on ${PORT}`))

// https://google.com/search?q=what+is+a+robot&email=cybergate