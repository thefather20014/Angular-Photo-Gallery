// Global Variables
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');
const cors = require('cors');
const multer = require('multer');
const uuid = require('uuid/v4');

// Initializations
const app = express();
const { mongoose } = require('./Database');

// Middlewares
app.use(express.json());

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'Uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname)); 
    }
});
app.use(multer({ storage }).single('image'));
app.use(cors({origin: 'http://localhost:4200'}));
app.use(morgan('dev'));

// Static Files
//app.use('/Uploads', express.static(path.resolve('Uploads')));
app.use(express.static(path.join(__dirname, 'Uploads')));

// Settings
app.set('port', process.env.Port || 3000);
app.set('views', path.join(__dirname, 'Views'));

// Routes
app.use('/movies', require('./Routes/Routes'));

// Listening the server
app.listen(app.get('port'), () => console.log(`Server on port ${chalk.green(app.get('port'))}`))