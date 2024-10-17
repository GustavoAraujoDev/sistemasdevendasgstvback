class ItemVenda {
    static idrandom = 10;
    constructor(produtoid, quantidade, nome, descricao, preco, precovenda) {
        this.itemId = ItemVenda.idrandom++;
        this.produtoid = produtoid;
        this.quantidade = quantidade;
        this.createdAt = new Date().toISOString(); // Data de criação
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.precovenda = precovenda;
    }
}

module.exports = ItemVenda;