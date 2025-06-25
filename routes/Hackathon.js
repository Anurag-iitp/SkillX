const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// My SQL se connection 
const flow=mysql.createPool({
    host:process.env.SKILL_HOST,
    user:process.env.SKILL_USER,
    password:process.env.SKILL_PASSWORD,
    database:process.env.SKILL_NAME,
});

router.get('/',(req,res)=>{
    const sql = 'SELECT * FROM hackathons';
    flow.query(sql,(err,result) => {
      if(err)return res.status(500).json({error: 'Error in hackathons table in database '});
      res.json(result);
    });
});


module.exports = router;
