const Pool = require("pg").Pool
require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    password: process.env.secret,
    host: "localhost",
    port: 5432,
    database: "capstone"
})

module.exports = pool;