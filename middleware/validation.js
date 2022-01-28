module.exports = (req, res, next) => {
    const { username, password, email } = req.body;

    validEmail = (userEmail) => {
        const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);

        return regEx;
    }

    if (req.path === "/register") {
        if (![username, password, email].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).send("Invalid Email");
        }
    }

    if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        }
    }

    next();
}
