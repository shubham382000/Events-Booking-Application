const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// body depicts property receiving the form data)         
const User = require('../Models/Users');   // table representation
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken'); 
const authenticate = require('../Middleware/Authenticate'); 


// User registration 

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('EMail is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() })
    }
    try {

        // getting the form data

        let { name, email, password } = request.body;

        // checking if user already exist or not

        let user = await User.findOne({ email: email });
        if (user) {
            return response.status(401).json({ errors: [{ msg: 'User Already Exists' }] })
        }

        // encrypt the password 

        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)

        // avatar URL

        let avatar = gravatar.url(email, {
            s: '200',      // size
            r: 'pg',       // rating
            d: 'mm'        // defualt image
        });

        let isAdmin = false;

        // SAVE TO DB 

        user = new User({ name, email, password, avatar, isAdmin });
        user = await user.save();
        response.status(200).json({
            msg: 'Registration is successful'
        })

    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors: [
                { msg: error.message }
            ]
        })
    }
});


// USER LOGIN 

router.post('/login', [
    body('email').notEmpty().withMessage('EMail is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() })
    }
    try {
        let { email, password } = request.body;

        // check if user exists 

        let user = await User.findOne({ email: email });
        if (!user) {
            return response.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        // checking the password 

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        // creating a json jwt token and send to client 

        let payload = {
            user: {
                id: user.id,
                name: user.name
            }
        }

        // creating a token 

        jwt.sign(payload, process.env.JWT_SECRET_KEY, (error, token) => {
            if (error) throw error;
            response.status(200).json({
                msg: 'Login Success',
                token: token,
                user: user
            })
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors: [
                { msg: error.message }
            ]
        })
    }
});

// getting particular user data

router.get('/', authenticate ,  async (request, response) => {
    try {
           let user = await User.findOne({_id : request.user.id});
           response.status(200).json({user : user}); 
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors: [
                { msg: error.message }
            ]
        })
    }
})

module.exports = router; 