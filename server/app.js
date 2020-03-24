const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
const uploadCon = require('./controller/Upload');
const multer = require('multer');
const images = multer({dest: 'images/'})
const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));


app.post('/upload', images.single('file'), uploadCon.upload );


const PORT  = process.env.PORT || 8081;
app.listen(PORT, () => console.info(`Server has Started on ${PORT}`));