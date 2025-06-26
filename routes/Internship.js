const express = require('express');
const router = express.Router();
const mysql = require('mysql');
require('dotenv').config();

// MYSQL pool Setup 
const flow = mysql.createPool({
    host: process.env.SKILL_HOST,
    user: process.env.SKILL_USER,
    password: process.env.SKILL_PASSWORD,
    database: process.env.SKILL_NAME,
});

// Route to get internships 
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM internships';
    flow.query(sql, (err, result) => {
        if (err) return res.status(500).send('Data error in internship one');
        res.render('internships', { internships: result });
    });
});

router.get('/add', (req, res) => {
    res.render('postInternship');
});

router.post('/add', (req, res) => {
    const {
        date_posted, // ✅ changed from date_of_posting
        company_name,
        job_role,
        source_link,
        job_location,
        experience_required,
        skills_required
    } = req.body;

    const sql = `INSERT INTO internships 
    (date_posted, company_name, job_role, source_link, job_location, experience_required, skills_required)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    flow.query(sql, [
        date_posted,
        company_name,
        job_role,
        source_link,
        job_location,
        experience_required,
        skills_required
    ], (err, result) => {
        if (err) {
            console.log("Error in inserting internships ", err);
            return res.status(500).send("Internships insertion failed");
        }
        res.redirect('/internships');
    });
});

module.exports = router;
