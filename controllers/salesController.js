const vendaService = require('../services/salesService');

const criarVenda = async (req, res) => {
    try {
        const venda = await vendaService.create(req.body);
        res.status(201).json(venda);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Erro ao criar venda', error: err.message });
        }
    }
};

const listarVendas = async (req, res) => {
    try {
        const vendas = await vendaService.findAll();
        res.status(200).json(vendas);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar vendas', error: err.message });
    }
};

const listarItensVenda = async (req, res) => {
    try {
        const itens = await vendaService.findAllItems();
        res.status(200).json(itens);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar itens de venda', error: err.message });
    }
};

const buscarVendaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await vendaService.findById(id);
        if (venda) {
            res.status(200).json(venda);
        } else {
            res.status(404).json({ message: 'Venda não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar venda', error: err.message });
    }
};

const buscarItensVendaPorId = async (req, res) => {
    try {
        const vendaId = req.params.id;
        const itensVenda = await salesService.ItensVendaPorId(vendaId);
        res.json(itensVenda);
    } catch (error) {
        console.error('Erro ao listar itens de venda:', error);
        res.status(500).json({ error: 'Erro ao listar itens de venda' });
    }
};

const atualizarVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await vendaService.update(id, req.body);
        res.status(200).json(venda);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Erro ao atualizar venda', error: err.message });
        }
    }
};

const deletarVenda = async (req, res) => {
    try {
        const { id } = req.params;
        await vendaService.delete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar venda', error: err.message });
    }
};

module.exports = {
    criarVenda,
    listarVendas,
    listarItensVenda,
    buscarVendaPorId,
    buscarItensVendaPorId,
    atualizarVenda,
    deletarVenda,
};
