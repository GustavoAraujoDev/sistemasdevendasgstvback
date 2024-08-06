const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');
const ItemVenda = require('../models/Itensvendas');

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

// Definição das associações
Venda.hasMany(ItemVenda, { foreignKey: 'vendaid', as: 'itens' });
ItemVenda.belongsTo(Venda, { foreignKey: 'vendaid', as: 'venda' });

module.exports = Venda;
