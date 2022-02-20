import { Request, Response } from "express"
import connection from "../../dados/connection";

export const mudarModuloTurma = async (req: Request, res: Response): Promise<void> => {

    const token = req.headers.authorization
    const turma_id: string = req.params.id
    const modulo: string = req.body.modulo
    let errorCode: number = 400;

    try {

        if (!token) {
            errorCode = 401
            throw new Error("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!modulo) {
            errorCode = 401
            throw new Error("Para alterar o módulo de uma turma é necessário informa o novo módulo para a mesma.")
        }

        if (modulo < "0" || modulo > "7") {
            errorCode = 404
            throw new Error("Módulo inválido, por gentileza informar um módulo entre 0 e 7.")
        }

        const buscarTurma = await connection('Turma')
            .select()
            .update('Turma.modulo', `${modulo}`)
            .where('Turma.id', `${turma_id}`)

        if (!buscarTurma) {
            errorCode = 404
            throw new Error("Turma não encontrada, por gentileza informar uma turma_id válido")
        }


        res.status(200).send()

    } catch (error: any) {
        res.status(errorCode).send({ mesagem: error.message })
    }
}