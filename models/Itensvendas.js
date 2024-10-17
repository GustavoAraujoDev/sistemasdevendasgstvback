class ItemVenda {
    static idrandom = 10;
    constructor(produtoid, nome, descricao, preco, precovenda, quantidade) {
        this.itemId = ItemVenda.idrandom++;
        this.produtoid = produtoid;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.precovenda = precovenda;
        this.quantidade = quantidade;
        this.createdAt = new Date().toISOString(); // Data de criação
    }
}

module.exports = ItemVenda;