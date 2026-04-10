const express = require("express") // server
const app = express()
const PORT = 5000
const PATH = require("path");
const bodyParser = require("body-parser")

// Middleware
app.use((req, res, next) => {
    // capture file
    // re-auth
    // cookies && session token
    // JWT token
    console.log("Middleware is connected now...")
    next()
})

// body-parser middleware
// app.use(bodyParser.json())
// app.use(express.json()) // REST API
app.use(bodyParser.urlencoded({ extended: false }))


// Middleware for login route
const preshware = () => {
    return (req, res, next) => {
        console.log("Middleware for login route is connected now...")
        next();
    }
}
// middleware to serve static files
app.use(express.static("frontend"));
app.use(express.static(PATH.join(__dirname, "frontend")));

// routes = home route
app.get('/', (req, res) => {
    res.send("My server")
})

// login route
app.get("/login", preshware(), (req, res) => {
    // Params, Query, body
    // res.send("Login Page")
    // res.status(404)

    // res.status(404).send("Login Page");
    res.sendFile(PATH.join(__dirname, "frontend/login.html"))

    // console.log(req);
    // const { username, password } = req.query
    // console.log(username, password);
    // res.redirect("/dashboard");
})

// POST login route
app.post("/login", (req, res) => {
    res.send("Login successful")

    // console.log(req.body);
    const { email, password } = req.body
    console.log(email, password);

})

// Dashboard Route
app.get("/dashboard", (req, res) => {
    res.send("Dashboard Page")
})

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
