const salesService = require('../services/salesService');

const getTotalVendas = async (req, res) => {
    try {
        const total = await salesService.getTotalVendas();
        res.status(200).json({ total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const inserirVenda = async (req, res) => {
    const { items, totalPrice, pagamento, situacao, clienteId } = req.body;
    try {
        const vendaId = await salesService.inserirVenda(items, totalPrice, pagamento, situacao, clienteId);
        res.status(201).json({ vendaId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const listarVendas = async (req, res) => {
    try {
        const vendas = await salesService.listarVendas();
        res.status(200).json(vendas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const listarItensVenda = async (req, res) => {
    const { vendaId } = req.params;
    try {
        const itensVenda = await salesService.listarItensVenda(vendaId);
        res.status(200).json(itensVenda);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const modificarVenda = async (req, res) => {
    const { situacao } = req.body;
    const { vendaId } = req.params;
    try {
        await salesService.modificarVenda(situacao, vendaId);
        res.status(200).json({ message: 'Venda modificada com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const excluirVenda = async (req, res) => {
    const { vendaId } = req.params;
    try {
        await salesService.excluirVenda(vendaId);
        res.status(200).json({ message: 'Venda excluída com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getTotalVendas,
    inserirVenda,
    listarVendas,
    listarItensVenda,
    modificarVenda,
    excluirVenda
};
