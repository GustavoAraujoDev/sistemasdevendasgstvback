const controller = require('../database/ClienteData')

function Listar(res, req) {
    controller.search((result) => {
        res.write(JSON.stringify(result));
        res.end();
    });
}
function Create(req, res) {
    let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.insertData.run(
                parsedBody.nome,
                parsedBody.email,
                parsedBody.cpf,
                parsedBody.telefone
            );
            console.log("Dados criados com sucesso.");
            res.end(); // Envie a resposta após a inserção de dados
        });
}

function Update(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        const parsedBody = JSON.parse(body);
        console.log(parsedBody);
        controller.modifyData.run(
            parsedBody.Nome,
            parsedBody.email,
            parsedBody.cpf,
            parsedBody.telefone,
            parsedBody.id
        );
        console.log("Dados modificados com sucesso.");
        res.end(); // Envie a resposta após a modificação de dados
    });
}
function Delete(req, res) {
    let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.deleteData.run(parsedBody.id);
            console.log("Dados excluídos com sucesso.");
            res.end(); // Envie a resposta após a exclusão de dados
        });
}

module.exports = {
    Listar, Create, Update, Delete
}