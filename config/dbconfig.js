const sqlite3 = require("sqlite3").verbose();
const logger = require("./logger");
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname,  '../SistemaVendaGstv.db'),
});

module.exports = sequelize;
