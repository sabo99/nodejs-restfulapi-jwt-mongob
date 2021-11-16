const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./app/config');
const mongoose = require('mongoose');

const corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Import Router --> Here <-- */
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to NodeJS-Express with MongoDB : JWT Authentication',
    });
});

const AuthRoutes = require('./app/routes/AuthRoutes');
const UserRoutes = require('./app/routes/UserRouters');

app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);

/** End Import Router */

/** Listen Port Server */
app.listen(config.SERVER_PORT, () =>
    console.log(`Server is running on port ${config.SERVER_PORT}`),
);

/** Connet To Database */
mongoose
    .connect(config.URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB is running on URL : ${config.URL} `))
    .catch((err) => console.log(err));
