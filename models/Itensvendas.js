class ItemVenda {
    static idrandom = 0o1;
    constructor(produtoid, quantidade, nome, descricao, preco, precovenda) {
        this.id = idrandom++;
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