import NoticiaRepository from "../repositories/NoticiaRepository.js"

class NoticiaController {

    async index(req,res) {
        const row = await NoticiaRepository.findAll()
        res.json(row)
    }
    async show(req, res) {
        const id = req.params.id
        const row = await NoticiaRepository.findById(id)
        res.json(row)
    }
    async store(req, res) {
        const dados = req.body
        const row = await NoticiaRepository.create(dados)
        res.json(row)
    }
    async update(req, res) {
        const id = req.params.id
        const dados = req.body
        const row = await NoticiaRepository.update(dados,id)
        res.json(row)
    }
    async delete(req, res) {
        const id = req.params.id
        const row = await NoticiaRepository.delete(id)
        res.json(row)
    }
}

// padrão Singleton
export default new NoticiaController()
