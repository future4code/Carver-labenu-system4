import { Request, Response } from "express"
import connection from "../../dados/connection";

export const mudarModuloTurma = async (req: Request, res: Response): Promise<void> => {

    const token = req.headers.authorization
    const turma_id: string = req.body.turma_id
    let errorCode: number = 400;

    try {

        if (!token) {
            errorCode = 401
            throw new Error("Para realizar essa operação é necessário ter token de autorização")
        }

        const mudarModulo = await connection("Turma")
            .select()
            .update({ turma_id: turma_id })

        res.status(200).send({ message: "Turma mudado com sucesso", mudarModulo })

    } catch (error: any) {
        res.status(errorCode).send({ mesagem: error.message })
    }
}