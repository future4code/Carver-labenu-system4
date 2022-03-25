import { Request, Response } from 'express'
import connection from '../../dados/connection'

export const mudarClasseDocente = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization
    const id = req.params.id
    const turma_id: string = req.body.turma_id
    let errorCode: number = 400

    try {
        if (!token) {
            errorCode = 401
            throw new Error("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!turma_id) {
            errorCode = 404
            throw new Error("Para alterar a turma de um docente é necessário informar o id da nova turma.")
        }

        const buscarTurma = await connection('Turma')
            .select()
            .where('Turma.id', `${turma_id}`)

        if (buscarTurma.length < 1) {
            errorCode = 404
            throw new Error("Turma não encontrada, por gentileza informar uma turma_id válido")
        }

        const buscarDocente = await connection('Docente')
            .select()
            .update({ turma_id: turma_id })
            .where('Docente.id', `${id}`)

        if (!buscarDocente) {
            errorCode = 404
            throw new Error("Docente não encontrado, por gentileza informar um id válido")
        }

        res.status(200).send()

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message || error.sqlMessage })
    }

}