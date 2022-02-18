import { Request, Response } from "express"
import connection from "../dados/connection"

export const MudarTurma = async (req: Request, res: Response): Promise<void> => {

    const token = req.headers.authorization
    const turma_id: string = req.body.turma_id
    let errorCode: number = 400;

    try {

        if (!token) {
            errorCode = 422

            throw new Error("Para mudar o modulo é necessário uma autorização")
        }

        const mudarModuloTurma = await connection("Turma").select().update({ turma_id: turma_id })

        res.status(201).send({ message: "Turma mudado com sucesso", mudarModuloTurma })

    } catch (err:any) {

        res.status(500).send({mesagem:err.message})
    }

};