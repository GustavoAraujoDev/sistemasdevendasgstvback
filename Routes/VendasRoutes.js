const controller = require("../Controllers/VendasController");

function requestVenda(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "GET") {
        const urlParts = req.url.split("/");
        if (urlParts.length === 3 && urlParts[1] === "ItensVendas") {
            // Listar itens de venda pelo ID da venda
            const vendaId = urlParts[2];
            controller.listarItensVenda(vendaId, (err, itens) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Erro ao listar itens da venda." }));
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(itens));
                }
            });
        }
        else{
            controller.listarVendas((err, vendas) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Erro ao listar vendas." }));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(vendas));
            }
        });}  // Listar todas as vendas

    } else if (req.method === "POST") {
            // Inserir nova venda
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                const novaVenda = JSON.parse(body);
                controller.inserirVenda(novaVenda.items, novaVenda.totalPrice, novaVenda.pagamento, novaVenda.situacao, novaVenda.id, (err, vendaId) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Erro ao inserir venda." }));
                    } else {
                        res.writeHead(201, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: "Venda inserida com sucesso.", vendaId }));
                    }
                });
            });
        // Adicione outras rotas POST, se necessário
    } else if (req.method === "PUT") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                const novaVenda = JSON.parse(body);
                controller.modificarVenda(novaVenda.situacao, novaVenda.vendaId, (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Erro ao modificar venda." }));
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: "Venda modificada com sucesso." }));
                    }
                });
            });
    } else if (req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.excluirVenda(parsedBody.id);
            console.log("Dados excluídos com sucesso.");
        });
    }
}

module.exports = {
    requestVenda
}
