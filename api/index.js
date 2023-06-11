const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(()=> {
    console.log("connected to mongoDB")
})
.catch(()=> {
    console.log("error connecting to mongoDB")
});

///mddlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common")); 

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//We wont be using them because we will be making REST APIs
// app.get("/", (req,res)=> {
//     res.send("Backend server is running at 8800")
// })

// app.get("/users", (req,res)=> {
//     res.send("Welcome to users")
// })


app.listen(8800, ()=> {
    console.log("Backend server is running")
})