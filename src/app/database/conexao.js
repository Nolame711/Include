import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Nos123Somos456',
    database: 'bdcopa'
})

conexao.connect() 

/**
 * Executa um código sql com ou sem valores
 * @param {string} sql instruçaõ sql a ser executada 
 * @param {string=id | [dados, id]} valores a serem passados para o sql 
 * @param {string} mensagemReject mensagem a ser exibida
 * @returns objeto da Promisse
 */

 export const consulta = (sql, valores='', mensagemReject) =>{
    return new Promise((resolve, reject)=>{
        conexao.query(sql, valores, (erro, result) =>{
            if(erro) return reject(mensagemReject)
            const linha = JSON.parse(JSON.stringify(result))
            return resolve(linha)
        })
    })
}

export default conexao
