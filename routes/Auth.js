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
        return res.send('<h2>All fields are required. <a href="/signup.html">Try Again</a></h2>');
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



router.post('/login',(req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        return res.send('<h2>Feilds are required . <a href="/login.html">TRY AGAIN</a></h2>');
    };

    const sql = 'SELECT * FROM users WHERE username = ?';
   flow.query(sql,[username],async(err,result)=>{
    if(err){
        return res.send('<h2>Error in Login data. <a href="/login.html">TRY AGAIN</a></h2> ')
    };
    if(result.length ===0){
        return res.send('<h2>User not found. <a href="/login.html">TRY AGAIN</a></h2> ')
    };
    const user =result[0];
const isMatch = await bcrypt.compare(password , user.password);

if(!isMatch){
    return res.send('<h2> Invalid Credentials . <a href="/login.html">Try again</a></h2>');
};

// Login Succesful
res.send(`<h2>Welcome Back , ${user.fname}!</h2><p><a href="/">Go to Home</a></p>`);


});
});















module.exports = router;