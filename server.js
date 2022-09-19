const express = require('express');
const app = express();
const data = require("./data.json");

app.use(express.json());

// Aqui está sendo feito uma solicitação de informações de usuário
app.get("/clients", function(req, res) {
    res.json(data);
});

app.get("/clients/:id", function(req, res) {
    const { id } = req.params
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    res.json(client);
});

// Aqui foi feito um imput de informações nos dados de usuários
app.post("/clients", function(req, res) {
    const { name, email } = req.body;

    res.json({ name, email });
});

// Aqui foi feito uma alteração no cadastro de usuário
app.put("/clients/:id", function(req, res) {
    const { id } = req.params
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    const { name } = req.body;

    client.name = name;

    res.json(client);    
});

// Aqui foi deletado um usuário
app.delete("/clients/:id", function(req, res) {
    const { id } = req.params
    const clientsFiltered = data.filter(client => client.id != id);

    res.json(clientsFiltered);
});

// Mensagem para iniciar o server.js
app.listen(3000, function() {
    console.log("Server is running");
});