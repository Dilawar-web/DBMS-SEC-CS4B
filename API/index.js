const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl:{
        rejectUnauthoriezed : false
    }
});


app.get('/' , async(req,res)=>{
    try{
        const result = await pool.query(`SELECT * FROM regions;`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

const PORT =  3030;
app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});