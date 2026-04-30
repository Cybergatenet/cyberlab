const express = require("express") // server
const app = express()
const PORT = 5000
const PATH = require("path");
const bodyParser = require("body-parser")
const SESSION = require("express-session")
const MYSQL = require("mysql2")
const UUID = require('uuid')

// const uid = UUID.v4()

// console.log(uid);


// Connecting To Database
const DB = MYSQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: 'preshDB'
})
// CRUD - Create Read Update Delete/Drop
// const sql = "SELECT * FROM Employee";
// DB.query(sql, (error, result) => {
//     // if(error) throw new Error("Failed to connect to DB");
//     if(error){
//         console.log(error.message);
//     }else{
//         console.table(result);
//         result.forEach(user => {
//             console.log(user.Email);       
//         })
//     }
// })

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

//  DB - SQL
const USERS = [
    {
        user_id: 1,
        username: "Cybergate",
        email: "cybergate@gmail.com",
        password: "123456",
        activated: true
    },
    {
        user_id: 2,
        username: "Precious",
        email: "precious@gmail.com",
        password: "123456",
        activated: true
    },
    {
        user_id: 3,
        username: "Chinedu",
        email: "chinedu@gmail.com",
        password: "asdfgh",
        activated: false
    }
]


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

app.post("/login", (req, res) => {
    // res.send("Data Recieved")
    // // object destructuring
    // console.log(email, pwd);
    // console.log(req);
    const { email, password } = req.body

    if(email && password){
        // validate
        // // USERS.forEach((user, index) => { // connecting to DB
        // //     if(email === user.email && password === user.password){
        // //         // login successful
        // //         // create user Session
        // //         SESSION({
        // //             resave: true,
        // //             // secret: express.secret("my secrete code here"),
        // //             // secret: bycrpt.hash("1234556"),
        // //             secret: "my secret",
        // //             saveUninitialized: true,
        // //             cookie: {
        // //                 maxAge: 36000
        // //             }
        // //         })

        // //         // create cookie for client
        // //         // SESSION.Cookie.send(user.user_id)
        // //         // redirect user dashboard
        // //         res.redirect("/dashboard")
        // //         // res.json({ isError: false, payload: user, message: "Login Successful"  })
        // //     }else{
        // //         // Wrong credential
        // //         res.status(200).json({ isError: true, payload: null, message: "Wrong Credentials. Try Again." })
        // //     }
        // })

        // Using Real Data
        DB.query(`SELECT * FROM Employee WHERE Email='${email}' AND password_hash='${password}'`, (error, result) => {
            if(error) throw new Error("Error: "+ error.message);
            
            if(result == null || result == []){
                res.json({ meesgae: "No Result Found | Invalid Credentials"})
            }else{
                result.forEach(staff => {
                    console.log(staff);
                    res.json({ payload: [...result]})
                })
            }
            
        })

    }else{
        res.status(300).json({ isError: true, payload: null, message: "Email or Password Cannot be Empty" })
    }
})

// Dashboard
app.get("/dashboard", (req, res) => {
    res.sendFile(PATH.join(__dirname, "frontend/dashboard.html"))
})

// signup page
app.get("/signup", (req, res) => {
    res.sendFile(PATH.join(__dirname, "/frontend/signup.html"))
})

app.post("/signup", (req, res) => {
    const { firstname, surname, email, department, password } = req.body;

    const sql = `INSERT INTO Employee (id, First_name, Surname, Email, department, password_hash) VALUES (20, '${firstname}', '${surname}', "${email}", '${department}', '${password}')`;

    DB.query(sql, (error, result) => {
        if(error) throw new Error("Insert Failed: "+ error.message);

        if(result){
            console.log("Account Has Been Created");
            res.redirect("/login");
        }
    })
})


app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
