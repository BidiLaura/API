const express = require('express');
const auau = require('./db');
const app = express();
app.use(express.json());
const port = 3000;

//visualizar tabela
app.get('/visualizar', (req, res) => {
  auau.query(
    `SELECT * FROM veiculos`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro na consulta:', err);
        return res.status(500).json({ error: 'Erro ao consultar veículos' });
      }
      return res.json(results);
    }
  );
});

//Visualizar por id
app.get('/visualizar/:id', (req, res) => {
const { id } = req.params;
  auau.query(
    `SELECT * FROM veiculos WHERE id = ?`,
    [id],
    function (err, results, fields) {
      if (err) {
        console.error('Erro na consulta:', err);
        return res.status(500).json({ error: 'Erro ao consultar veículos' });
      }
      // Retorna os resultados como um objeto JSON
      return res.json(results);
    }
  );
});

//adicionar
app.post('/add', (req, res) => {
  const {marca, modelo, ano, cor, proprietario} = req.body;
  auau.query(
    `INSERT INTO veiculos (marca, modelo, ano, cor, proprietario) VALUES (?, ?, ?, ?, ?)`,
    [marca, modelo, Number(ano), cor, proprietario],
    function (err, results, fields){
      if (err){
        console.error('erro na inserção', err)
        return
      }
      console.log(results)
      console.log(fields)
    }
  )
  res.send(`Carro recebido: ${marca}, ${modelo}, ${ano}, ${cor}, ${proprietario}`);
});

//atualizar por id
app.put('/atualizar/:id', (req, res) => {
   const { id } = req.params;
   const {marca, modelo, ano, cor, proprietario} = req.body;
    auau.query(
      `UPDATE veiculos set marca = ?, modelo = ?, ano = ?, cor = ?, proprietario = ? WHERE id = ?`,
      [marca, modelo, Number(ano), cor, proprietario, id],
      function (err, results, fields){
        if (err){
          console.error('erro na inserção', err)
          return
        }
        console.log(results)
        console.log(fields)
      }
    );
    res.send(`Carro atualizado: ${marca}, ${modelo}, ${ano}, ${cor}, ${proprietario}`);
  })

  //deletar por id
 app.delete('/deletar/:id', (req, res) => {
  const { id } = req.params;
  const {marca, modelo, ano, cor, proprietario} = req.body;
    auau.query(
      `DELETE FROM veiculos WHERE id = ?`,
      [Number(id), marca, modelo, Number(ano), cor, proprietario],
      function (err, results, fields){
        if (err){
          console.error('erro na inserção', err)
          return
        }
        console.log(results)
        console.log(fields)
      }
    )
    res.send(`Carro deletado`);
    })

app.listen(port, () => {
  console.log(`API de veículos ouvindo na porta ${port}`);
});
