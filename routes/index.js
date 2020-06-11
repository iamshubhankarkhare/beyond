const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// router.post('/login', (req, res) => {
//     console.log(req.body);
//     const { username, password } = req.body
//     console.log(username + " " + password);

//     res.status(401)
//     res.json({ "username": username });
// })

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

module.exports = router;



