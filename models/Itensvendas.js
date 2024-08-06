const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');
const Produto = require('../models/productModel'); // Certifique-se de que o caminho está correto
const Venda = require('../models/salesModel'); // Certifique-se de que o caminho está correto

const ItemVenda = sequelize.define('ItemVenda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vendaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Venda,
            key: 'vendaid',
        },
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'productid',
        },
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    precovenda: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
}, {
    timestamps: true,
    tableName: 'itens_venda',
});

ItemVenda.belongsTo(Venda, { foreignKey: 'vendaid', as: 'venda'  });

module.exports = ItemVenda;
