require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const path = require('path');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use('/api', router, express.static(path.resolve(__dirname, 'static')));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
