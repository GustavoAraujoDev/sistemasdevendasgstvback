// models/vendaModel.js
class Venda {
    static idrandom = 10;
    constructor(totalprice, pagamento, situacao, productids, clienteid) {
        this.Vendaid = Venda.idrandom++; // ID da venda
        this.totalprice = totalprice; // Preço total
        this.pagamento = pagamento; // Método de pagamento
        this.situacao = situacao; // Situação da venda
        this.productids = productids;
        this.clienteid = clienteid; // ID do cliente associado
        this.createdAt = new Date().toISOString(); // Data de criação
        this.updatedAt = new Date().toISOString(); // Data de atualização
    }
}

module.exports = Venda;