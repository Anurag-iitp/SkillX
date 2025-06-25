const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

// My sql se connection 
const flow = mysql.createPool({
    host:process.env.SKILL_HOST,
    user:process.env.SKILL_USER,
    password:process.env.SKILL_PASSWORD,
    database:process.env.SKILL_NAME,
});

// Signup route 

router.post('/signup',async(req,res)=>{
    const {fname,lname,dob,username,password}=req.body;

    if(!fname || !lname ||!dob || !username || !password){
        return res.send('<h2>All fields are required. <a href="/signup.html>Try Again</a></h2>');
    };

    try {
        const Secret= await bcrypt.hash(password,10);
        const sql = 'Insert Into users (fname , lname , dob, username, password) VALUES (?,?,?,?,?)'
        flow.query(sql,[fname,lname,dob,username,Secret],(err,result)=>{
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    return res.send('<h2>Username already exists. <a href="/signup.html">Try again</a></h2>');
                }
                 return res.send('<h2>Database error in signup . <a href="/signup.html">Try again</a></h2>');
            }
            res.redirect('/login');
        });
    }catch(error){
        console.log("Secret error",error);
        res.send('<h2>Server mein error aa rha h . <a href="/signup.html">TRY AGAIN</a></h2>');
    }
});

module.exports = router;