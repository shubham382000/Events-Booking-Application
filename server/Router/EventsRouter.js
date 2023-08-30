const express = require('express');
const router = express.Router();
const authenticate = require('../Middleware/Authenticate');
const { body, validationResult } = require('express-validator');
const Event = require('../Models/Events')


// uploading the event ---- only the logged in plus admin can access the upload 

router.post('/upload', authenticate, [
    body('name').notEmpty().withMessage('Name of event is required'),
    body('image').notEmpty().withMessage('Image is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('type').notEmpty().withMessage('Type of event is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('info').notEmpty().withMessage('Info of event is required'),
], async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    try {
        let { name, image, date, type, price, info } = request.body;
        let user = request.user.id;
        let event = new Event({ user, name, image, date, type, price, info });
        event = await event.save();
        response.status(200).json({
            msg: 'Event Upload Is Succcessful',
            event: event
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

// accessing the free events

router.get('/free', async (request, response) => {
    try {
        let events = await Event.find({ type: 'Free' });
        response.status(200).json({events : events});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors: [
                { msg: error.message }
            ]
        });
    }
});

// accessing the pro events 

router.get('/pro', authenticate , async (request, response) => {
    try {
        let events = await Event.find({ type: 'Pro' });
        response.status(200).json({events : events});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors: [
                { msg: error.message }
            ]
        });
    }
});

module.exports = router; 