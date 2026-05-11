const express = require("express") // server
const app = express()
const PATH = require("path");
const bodyParser = require("body-parser")
const SESSION = require("express-session")
const MYSQL = require("mysql2")
const UUID = require('uuid')
const JWT = require("jsonwebtoken")
const BYCRYPT = require("bcrypt") // password hashing & verification
const crypto = require("crypto") // gen base 64 ramdom string for JWT
require("dotenv").config()
const PORT = process.env.PORT

// const uid = UUID.v4()

// console.log(uid);


// generate secret token
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);


// Connecting To Database
const DB = MYSQL.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
app.use(bodyParser.json()) // JSON Data
app.use(express.json()) // REST API
app.use(bodyParser.urlencoded({ extended: false })) // POST


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
        // DB.query(`SELECT * FROM Employee WHERE Email='${email}' AND password_hash='${password}'`, (error, result) => {
        //     if(error) throw new Error("Error: "+ error.message);
            
        //     if(result == null || result == []){
        //         res.json({ meesgae: "No Result Found | Invalid Credentials"})
        //     }else{
        //         // create Session using JWT
        //         result.forEach(staff => {
        //             console.log(staff);
        //             res.json({ payload: [...result]})
        //         })
        //     }
        // })

        // Applying JWT and Bycrypt and prepared statement
        DB.query("SELECT * FROM Employee WHERE Email=? LIMIT 1", [email], (error, result) => {
            if(error) throw new Error("Error: "+ error.message);

            if(result == null || result == []){
                res.json({ message: "No Result Found"})
            }else{
                // verify Password
                // console.log(result[0].password_hash);
                if(BYCRYPT.compare(password, result[0].password_hash)){
                    // password match
                    // create Session using JWT
                    const payload = [result, ...result[0].password_hash]
                    const token = JWT.sign({payload: payload}, process.env.JWT_TOKEN, { expiresIn: '1hr' })

                    // used for client-side validation
                    // using LocalStorage
                    // Using Session storage
                    res.json({ token: token })
                    console.log(token);

                    // using Cookie (http-only: true, backend handle session creation)
                    res.cookie(
                        result[0].First_name,
                        [result, ...result[0].password_hash],
                        {
                            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
                            httpOnly: true, // XSS attacks
                            secure: true // CSRF attack
                        }
                    )


                    // on logout route
                    // res.clearCookie("name")
                    
                }else{
                    // password mismatch
                    res.json({ message: "Invalid Credentials"})
                }
            }
        })

    }else{
        res.status(300).json({ isError: true, payload: null, message: "Email or Password Cannot be Empty" })
    }
})

// Dashboard
app.get("/dashboard", (req, res) => {
    return res.sendFile(PATH.join(__dirname, "frontend/dashboard.html"))
})

// signup page
app.get("/signup", (req, res) => {
    res.sendFile(PATH.join(__dirname, "/frontend/signup.html"))
})

app.post("/signup", async (req, res) => {
    const { firstname, surname, email, department, password } = req.body;

    // Generate a salt for password
    const salt_rounds = 10;
    // const salt = BYCRYPT.genSalt(salt_rounds)

    // Hashing of User password
    const hashed_password = await BYCRYPT.hash(password, salt_rounds)

    const sql = `INSERT INTO Employee (id, First_name, Surname, Email, department, password_hash) VALUES (20, '${firstname}', '${surname}', "${email}", '${department}', '${hashed_password}')`;

    DB.query(sql, (error, result) => {
        if(error) throw new Error("Insert Failed: "+ error.message);
        
        if(result){
            console.log("Account Has Been Created");
            res.redirect("/login");
        }
    })
})


// Fetch all Product REST-API
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";

    DB.query(sql, (error, result) => {
        if(error) throw new Error("Request Failed: "+ error.message);

        if(result.length > 0){
            // sending to frontend
            res.json({ payload: result })
        }else{
            res.json({ message: "No Product Found" })
        }

    })
})

// Delete Request
app.delete("/delete/:id", (req, res) => {
    const sql = `DELETE FROM products WHERE products_id='${req.params.id}'`;

    console.log("REQ. ID: ", req.params.id);
    

    // DELETE FROM `products` WHERE `products`.`products_id` = 511

    DB.query(sql, (error, result) => {
        if(error) throw new Error("Request Failed: "+error.message);

        if(result){
            
            res.json({ message: "Successfully Deleted" });
            console.log("SQL Result: ", result);
        }else{
            res.json({ error: true, message: "Unable to Delete" })
        }
    })
})

// Update Product Route
app.post("/update", (req, res) => {
    const { products_id, product_name, price, quantity } = req.body

    console.log(typeof(+products_id), product_name, price, quantity);

    // return;
    // const sql = `UPDATE Employee SET price='${price}', quantity='${quantity}', product_name='${product_name}' WHERE products_id=${+products_id} LIMIT 1`;

    const sql = `UPDATE products SET price='${price}', quantity='${quantity}', product_name='${product_name}' WHERE products_id=`+products_id;

    // const sql = "UPDATE `products` SET `price` = '910000', `product_name` = 'battery22-2', `quantity` = '3030' WHERE `products`.`products_id` = 514";

    DB.query(sql, (error, result) => {
        if(error) throw new Error("Failed to Update: "+ error.message);

        if(result){
            console.log("SQL Result: ", result);
            return res.json({ message: "Prodcut Updated Successfully", msg: result.message });
        }else{
            return res.json({ error: true, message: "Unable to Update Record" })
        }
    })    
})

// update using Patch request method
app.patch("/update/:id", (req, res) => {
    const id = req.params.id

    console.log(id);

    const sql = `UPDATE products SET price='${price}', product_name='${product_name}', quantity='${quantity}' WHERE products_id=`+products_id;

    DB.query(sql, (error, result) => {
        if(error) throw new Error("Failed to Update: "+ error.message);

        if(result){
            console.log("SQL Result: ", result);
            return res.json({ message: "Prodcut Updated Successfully", msg: result.message });
        }else{
            return res.json({ error: true, message: "Unable to Update Record" })
        }
    })
})

// Add New Product
app.post("/addproduct", (req, res)=>{
    const { name, price, quantity } = req.body
    // console.log(req);
    // return
    // Using prepared statement
    const sql = 'INSERT INTO products(`products_id`, `price`, `product_name`, `quantity`) VALUES (?,?,?,?)';

    DB.query(sql, [null, price, name, quantity], (error, result) => {
        if(error) throw new Error("Insert failed: "+ error.message);

        if(result != null){
            res.json({ message: "Product Created Successfully" })
        }else{
            res.json({ message: "Failed to Insert, result is Null" })
        }
    })
})





app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
