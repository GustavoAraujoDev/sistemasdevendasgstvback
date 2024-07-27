const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: {
                args: /^\d{11}$/,
                msg: 'CPF must be 11 digits'
            }
        },
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /^\+?[1-9]\d{1,14}$/,
                msg: 'Telefone must be a valid phone number'
            }
        },
    },
}, {
    timestamps: true,
    tableName: 'clientes',
});

module.exports = Cliente;
