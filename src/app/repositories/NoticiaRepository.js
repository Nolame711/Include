import { consulta } from '../database/conexao.js'

class NoticiaRepository {
    //CRUD
    create(dados) {
        const sql = "INSERT INTO noticia SET ?;"
        return consulta(sql, dados, 'Não foi possível cadastrar!')
    }

    findAll() {
        const sql = "SELECT * FROM noticia;"
        return consulta(sql, 'Não foi possível localizar!')
    }

    findById(id) {
        const sql = "SELECT * FROM noticia WHERE id=?;"
        return consulta(sql, id, 'Não foi possível localizar!')
    }

    update(dados, id) {
        const sql = "UPDATE noticia SET ? WHERE id=?;"
        return consulta(sql, [dados, id], 'Não foi possível atualizar!')
    }

    delete(id) {
        const sql = "DELETE FROM noticia WHERE id=?;"
        return consulta(sql, id, 'Não foi possível apagar!')
    }
}

export default new NoticiaRepository()
