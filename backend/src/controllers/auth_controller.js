const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const { id } = req.body;

        const login = await connection('ongs').where('id', id).select('name').first();

        if (!login) {
            return res.status(400).json({ error: "Login não encontrado." })
        }

        return res.json(login);
    }
}