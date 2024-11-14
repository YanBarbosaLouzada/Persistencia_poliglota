import { pool } from "../config/database.js"

export default class MusicaController {

    static async getAllMusics(req, res) {
        try {
            const { rows } = await pool.query(`SELECT * FROM "musica";`);
            return res.json(rows)
        } catch (error) {
            console.error("Error fetching musica:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getMusicById(req, res) {
        const { id } = req.params;
        try {
            const { rows } = await pool.query(`SELECT * FROM "musica" WHERE id=$1;`, [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: "Music not found" });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error("Error fetching musica:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async createMusic(req, res) {
        const { nome, genero, cantor, nota } = req.body;
        try {
            const { rows } = await pool.query(`INSERT INTO "musica" (nome, genero, cantor, nota) VALUES ($1,$2,$3,$4) RETURNING *;`,
                [nome, genero, cantor, nota]);
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error("Error creating musica", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async updateMusic(req, res) {
        const { id } = req.params;
        const { nome, genero, cantor, nota } = req.body;
        try {
            const { rows } = await pool.query(
                `UPDATE "musica" SET nome = $1, genero = $2, cantor = $3, nota = $4 WHERE id = $5 RETURNING *;`,
                [nome, genero, cantor, nota, id]
            );
            if (rows.length === 0) {
                return res.status(404).json({ message: "Music not found" });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error("Error updating musica:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async deleteMusic(req, res) {
        const { id } = req.params;
        try {
            const { rowCount } = await pool.query(`DELETE FROM "musica" WHERE id=$1;`, [id]);
            if (rowCount === 0) {
                return res.status(404).json({ message: "Music not found" });
            }
            res.json({ message: "music deleted successfully" });
        } catch (error) {
            console.error("Error deleting music:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

}