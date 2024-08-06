const Venda = require('../models/salesModel');
const ItemVenda = require('../models/Itensvendas');
const Produto = require('../models/productModel');
const sequelize = require('../config/dbconfig');
const { ValidationError } = require('sequelize');

class VendaService {
    // Cria uma nova venda e seus itens, atualiza o estoque dos produtos
    async create(vendaData) {
        const { items, totalprice, pagamento, situacao, clienteid } = vendaData;
        const transaction = await sequelize.transaction();

        try {
            // Validação dos dados de entrada
            if (items.length === 0) {
                throw new ValidationError('A venda deve ter pelo menos um item.');
            }

            for (let item of items) {
                if (!item.productid) {
                    throw new ValidationError('O campo product_id é obrigatório para todos os itens.');
                }
                const produto = await Produto.findByPk(item.productid);
                if (!produto) {
                    throw new ValidationError(`Produto com ID ${item.productid} não encontrado.`);
                }
                if (item.quantidade > produto.quantidade) {
                    throw new ValidationError(`Quantidade indisponível para o produto ${produto.nome}.`);
                }
            }

            // Cria a venda
            const venda = await Venda.create({
                datavenda: new Date(),
                totalprice: totalprice,
                pagamento,
                situacao,
                clienteid: clienteid,
            }, { transaction });

            const vendaId = venda.Vendaid;

            // Cria os itens da venda
            const itensVenda = items.map(item => ({
                vendaid: vendaId,
                productid: item.productid,
                nome: item.nome,
                descricao: item.descricao,
                preco: item.preco,
                precovenda: item.precovenda,
                quantidade: item.quantidade,
            }));

            await ItemVenda.bulkCreate(itensVenda, { transaction });

            // Atualiza o estoque dos produtos
            for (let item of items) {
                const produto = await Produto.findByPk(item.productid);
                produto.quantidade -= item.quantidade;
                await produto.save({ transaction });
            }

            // Commit da transação
            await transaction.commit();

            return venda;
        } catch (err) {
            // Rollback em caso de erro
            await transaction.rollback();
            throw err;
        }
    }

    // Lista todas as vendas com seus itens
    async findAll() {
        return await Venda.findAll({
            include: [ItemVenda],
        });
    }

    // Busca uma venda por ID com seus itens
    async findById(id) {
        return await Venda.findByPk(id, {
            include: [{
                model: ItemVenda,
                as: 'itens' // Usando o alias definido na associação
            }],
        });
    }

    async ItensVendaPorId(vendaId) {
        try {
            const itensVenda = await ItemVenda.findAll({
                where: { vendaId: vendaId }
            });
            return itensVenda;
        } catch (error) {
            console.error('Erro ao listar itens de venda:', error);
            throw error;
        }
    };

    // Atualiza uma venda e seus itens
    async update(id, vendaData) {
        const { items, totalprice, pagamento, situacao, clienteid } = vendaData;
        const transaction = await sequelize.transaction();

        try {
            const venda = await this.findById(id);
            if (!venda) {
                throw new Error('Venda not found');
            }

            // Atualiza a venda
            await venda.update({
                totalprice: totalprice,
                pagamento,
                situacao,
                cliente_id: clienteid,
            }, { transaction });

            // Deleta itens antigos
            await ItemVenda.destroy({
                where: { venda_id: id },
                transaction,
            });

            // Cria novos itens
            const itensVenda = items.map(item => ({
                venda_id: id,
                product_id: item.product_id,
                nome: item.nome,
                descricao: item.descricao,
                preco: item.preco,
                precovenda: item.precovenda,
                quantidade: item.quantidade,
            }));

            await ItemVenda.bulkCreate(itensVenda, { transaction });

            // Atualiza o estoque dos produtos
            for (let item of items) {
                const produto = await Produto.findByPk(item.productid);
                produto.quantidade -= item.quantidade;
                await produto.save({ transaction });
            }

            // Commit da transação
            await transaction.commit();

            return venda;
        } catch (err) {
            // Rollback em caso de erro
            await transaction.rollback();
            throw err;
        }
    }

    // Deleta uma venda e seus itens
    async delete(id) {
        const transaction = await sequelize.transaction();

        try {
            const venda = await this.findById(id);
            if (!venda) {
                throw new Error('Venda not found');
            }

            // Deleta itens da venda
            await ItemVenda.destroy({
                where: { vendaid: id },
                transaction,
            });

            // Deleta a venda
            await venda.destroy({ transaction });

            // Commit da transação
            await transaction.commit();

            return venda;
        } catch (err) {
            // Rollback em caso de erro
            await transaction.rollback();
            throw err;
        }
    }

    // Lista todos os itens de venda
    async findAllItems() {
        return await ItemVenda.findAll();
    }
}

module.exports = new VendaService();
