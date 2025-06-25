const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();


// MYSQL pool Setup 

const flow=mysql.createPool({
    host:process.env.SKILL_HOST,
    user:process.env.SKILL_USER,
    password:process.env.SKILL_PASSWORD,
    database:process.env.SKILL_NAME,
});

// Route to get internships 
router.get('/',(req,res)=>{
    const sql='SELECT * FROM internships';
    flow.query(sql,(err,result)=>{
        if(err)return res.status(500).json({error:'DATABASE CHECK KAR BHAI'});
        res.json(result);
    });
});

module.exports = router;