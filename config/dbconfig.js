const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../SistemaVendaGstv.db'),
});

const controlFilePath = path.join(__dirname, 'db_initialized.txt');

if (!fs.existsSync(controlFilePath)) {
    sequelize.sync({ force: true }) // Se deseja forçar a recriação das tabelas
        .then(() => {
            console.log('Database synchronized');
            fs.writeFileSync(controlFilePath, 'Database initialized.');
        })
        .catch((err) => {
            console.error('Error synchronizing database:', err);
        });
} else {
    console.log('Database already initialized.');
}

module.exports = sequelize;
