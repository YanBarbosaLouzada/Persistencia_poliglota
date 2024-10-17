export default class TestController {
    // Neste arquivo criamos as funções que estão disponiveis na rota /exemplo
    // primeiro temo o nome da função os parametros e o que ela retorna

    static async PrimeiraFuncao(req, res) {
        return res.json({ message: "este é o controller funcionando" })
    }
    static async get(req, res) {
        return res.json({ message: "Você veio pegar alguma coisa ?" })
    }
    static async post(req, res) {
        const {name} = req.body;
        return res.json({message: `oi voce veio adicionar seu nome? --- ${name}` })
    }
    static async put(req, res) {
        const {dados} = req.body;
        return res.json({ message: `você veio editar dados? --- ${dados}` })
    }
    static async delete(req, res) {
        const { id } = req.params;
        return res.json({ message: `voce quer deletar esse id? --- ${id}`})
    }
}