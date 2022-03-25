import { Request, Response } from "express"
import connection from "../../dados/connection";

export const buscarTurmasAtivas = async (req: Request, res: Response): Promise<void> => {

    try {
        const turmas = await connection("Turma")
            .select()
            .where("Turma.modulo", ">", "0")

        res.status(200).send({ "turmas ativas": turmas })
    }

    catch (error: any) {
        res.status(500).send({ mensagem: error.message })
    }
}
