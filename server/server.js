const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


// configuring cors 
app.use(
    cors({
        allowedHeaders: "*",
        allowMethods: "*",
        origin: "*",
    })
);

// configure express to receive form data 

app.use(express.json());

// configure dotenv 

dotEnv.config({ path: './.env' });

const hostname = process.env.LOCAL_HOST_NAME;
const port = process.env.LOCAL_PORT;

// connect to mongoDB 

mongoose.connect(process.env.MONGO_DB_URL).then((response) => {
    console.log(`Connected to MongoDB successsfully`)
}).catch((error) => {
    console.error(error);
    process.exit(1);
})


// basic request 

app.get('/',cors(),  (request, response) => {
    response.send(`<h2>Welcome to Events Booking Application</h2>`);
});

// router configuration 

app.use('/api/users', require('./Router/UserRouter'));
app.use('/api/events', require('./Router/EventsRouter'));

app.listen(port, hostname, () => {
    console.log(`Express Server is started at http://${hostname}:${port}`);
}); 