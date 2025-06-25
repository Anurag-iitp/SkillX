const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const app = express();


// Creating the connection 
const flow=mysql.createPool({
    host:process.env.SKILL_HOST,
    user:process.env.SKILL_USER,
    password:process.env.SKILL_PASSWORD,
    database:process.env.SKILL_NAME,
});

// Signup and login form parser 
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

const authRoutes = require('./routes/Auth');
app.use('/auth', authRoutes);


// MIDDLEWARE

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// STATIC FILES
app.use(express.static(path.join(__dirname,'public')));

// Routes
app.get(',',(req,res)=> {
    res.sendfile(path.join,__dirname ,'public','index.html');
});


// INTERNSHIPROUTE 

const internshipRoute = require('./routes/Internship');
app.use('/Internships',internshipRoute);

// HackathonsRoute

const hackathonRoute = require('./routes/Hackathon');
app.use('/Hackathons',hackathonRoute); 

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

