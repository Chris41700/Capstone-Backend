const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validation = require("../middleware/validation");
const authorization = require("../middleware/authorization");

router.post("/register", validation, async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const userEmailInUse = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
        if (userEmailInUse.rows.length > 0) {
            return res.status(401).send("User already exist");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
             [username, bcryptPassword, email]
        );

        const token = jwtGenerator(newUser.rows[0].user_id);
        
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

router.post("/login", validation, async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(401).send("Username is incorrect");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) {
            return res.status(401).send("Password is incorrect")
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;