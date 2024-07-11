/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const Port = process.env.PORT;
console.log(Port)

const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { ObjectId } = require('mongodb'); // Import ObjectId
const app = express();
const port = 8080;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "rice"

app.use(cors());
app.use(express.json());

// Specify the database name in the connection URL
const dbUrl = "mongodb://localhost:27017/entertainment-web-app";

mongoose.connect(dbUrl)
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// let moviesCollection  = mongoose.connection.db.collection("movies");
// Define routes
app.get("/api/movies", async (req, res) => {
  try {
    // Get a reference to the "movies" collection
    const collection = mongoose.connection.db.collection("movies");
    
    // Fetch all documents from the collection
    const movies = await collection.find({}).toArray();
    
    res.json(movies);
  } catch (err) {
    console.error('Error performing GET request:', err);
    res.status(500).send('Internal Server Error');
  }
});

const setBoookMark  = async (req , res) => {
  console.log(`request recieved for ${req.params._id}`)
  try {
    const _id = req.params._id;

    const collection = mongoose.connection.db.collection("movies");

//     // Find the movie with the given title
    const movie = await collection.findOne({ _id: new ObjectId(_id) });
    if(!movie){
       return res.status(404).json({
        status : "Not found",
        message : "Movie not found"
      })
    }
    const updatedMovie = await collection.findOneAndUpdate({_id : new ObjectId(_id)} , 
  {$set : {isBookmarked : !movie.isBookmarked}},
  { returnOriginal: false }
);
    res.status(201).json({
        status : "success",
        message : "Movie updated successfully",
        movie : updatedMovie
    });
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      status : "error",
      message : "Internal server error"
    })
  }
};



const userSchema = new mongoose.Schema({
  email : {
    type : String,
    require : true,
    unique : true,
    // lowercase : true
  },
  password : {
    type : String,
    require : true,
    select : false
  },
  profilePic : {
    type : String
  }
});

userSchema.pre("save" , async function (next) {
  if(!this.isModified("password")){
    return next();
  };
  // const salt = await bcrypt
  this.password = await bcrypt.hash(this.password , 12);
  next()
})

userSchema.methods.checkPassword = async function(password , savedPassword){
  return await bcrypt.compare(password , savedPassword);
}

const  User = mongoose.model("User" , userSchema);


// const verifyToken = async (req, res) => {
//   const token = req.headers.authorization;
//   if(!token){
//     return res.status(401).json({status : "error" , message : "No token provided."})
//   }
//   try {
//     const decoded = jwt.verify(token , secretKey);
//     const user = await User.findById(decoded.id).select("-password");
//     if(!user){
//       return res.status(401).json({status : "error" , message : "No user found."})
//       }
//       req.user = user;
//       next();
//       } catch (error) {
//         return res.status(401).json({status : "error" , message : "Invalid token."})
//       }
// }



const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ status: "error", message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ status: "error", message: "No user found." });
    }
    // req.token = ;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: "error", message: "Token has expired." });
    }
    return res.status(401).json({ status: "error", message: "Invalid token." });
  }
};

const signUp = async (req , res) => {
  console.log("a request hit the server")
   try {
    const userExist = await User.findOne({email : req.body.email});
    if(userExist){
       return res.status(409).json({
        status : "Conflict" ,
        message : "Email already in use"
      })
    }
    await User.create(req.body);
    res.status(201).json({
        status : "Created",
        message : "User created successfully"
      });
  } 
  catch (error) {
    console.log(error)
  }
}
app.post( "/api/auth/users/signup", signUp);


const loginUser = async (req, res) => {
  console.log(`request recieved for ${req.body.email}`)
  try {
    const {email , password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Email and password are required",
      });
    }

    // Find the user by email
const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      return res.status(404).json({
        status: "Not found",
        message: "Email not found",
      });
    }

   
    // Check if the password is correct
    const correctPassword = await user.checkPassword(password, user.password);
    if (!correctPassword) {
      return res.status(403).json({
        status: "Forbidden",
        message: "Password not correct",
      });
    }

    // If the user is verified successfully
    const token = jwt.sign({ email: user.email}, secretKey , { expiresIn: '1d' });
    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({
      status: "Success",
      message: "User verified successfully",
      token: token,
      user  : userData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
};

app.post("/api/auth/login", loginUser);

app.put("/api/movie/bookmark/:_id" , setBoookMark)


// Start server
app.listen(port, () => {
  console.log("Server is running on port", port);
});


