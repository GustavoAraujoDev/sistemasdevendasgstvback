const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../SistemaVendaGstv.db'),
});


module.exports = sequelize;
