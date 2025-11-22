const mongoose = require('mongoose');
const express = require('express');
const logger = require('./src/loggers/logger');
require('dotenv').config();
const responseMessage = require('./src/constants/responseInfo');
const userRoutes = require('./src/routes/userRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const borrowRoutes = require('./src/routes/borrowRoutes');
const app = express();

app.use(express.json());
app.use('/user',userRoutes);
app.use('/book',bookRoutes);
app.use('/borrow',borrowRoutes);
mongoose.connect(process.env.MONGODB_CON_URL)
    .then(() => {
        logger.info(`${responseMessage.SERVICE} connected to database ✅`)

        app.listen(process.env.PORT, () => {

            logger.info(`${responseMessage.SERVICE} started on PORT ${process.env.PORT} 👤`);
        })
    }).catch((err) => {
        logger.error(`${responseMessage.SERVICE} failed  to connect  database `, err);
    })