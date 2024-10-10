const mysql = require('mysql2')
// importando biblioteca

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'auau'
})
//cria conexão

connection.connect(err => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados:', err)
        return
    }
    console.log('Conectado ao banco de dados')
})

module.exports = connection
