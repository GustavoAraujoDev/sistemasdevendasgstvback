const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const Venda = sequelize.define('Venda', {
    Vendaid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    datavenda: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalprice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    pagamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clienteid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'vendas',
});

module.exports = Venda;
