
import { Request, Response } from "express"
import connection from "../dados/connection"
import { getDocenteId } from "../requisicoes/getDocentes";
import { getEstudantesId } from "../requisicoes/getEstudantesId"
import { Turma } from "../classes/classeTurma";


export const GetTurma = async (req: Request, res: Response): Promise<void> => {

    let errorCode: number = 400;


    try {
        const { modulo }: { modulo: string } = req.body

        if (modulo === "0") {

            errorCode = 422

            throw new Error("'modulo' de turma inativa")
        }

        const getAllTurmas = await connection("Turma").select().where("Turma.modulo", ">", "0")

        res.status(201).send(getAllTurmas)

    }
    catch (err: any) {
        res.status(500).send({ mensagem: err.message })
    }

};


export const GetAllTurma = async (req: Request, res: Response): Promise<void> => {

    let errorCode: number = 400;


    try {

        const getAllTurmas = await connection("Turma").select()

        for (let i = 0; i < getAllTurmas.length; i++) {
            getAllTurmas[i].docentes = await getDocenteId(getAllTurmas[i].id)
            getAllTurmas[i].estudantes = await getEstudantesId(getAllTurmas[i].id)
        }

        const result = getAllTurmas.map((item) => {
            return ({ id: item.id, nome: item.nome, modulo: item.modulo, docente: item.docentes, estudantes: item.estudante })
        })

        res.status(201).send(result)
    }
    catch (err: any) {
        res.status(500).send({ mensagem: err.message })
    }

};



export const MudarTurma = async (req: Request, res: Response): Promise<void> => {

    const token = req.headers.authorization
    const turma_id: string = req.body.turma_id
    let errorCode: number = 400;

    try {

        if (!token) {
            errorCode = 422

            throw new Error("Para mudar o modulo é necessário uma autorização")
        }

        const mudarModuloTurma = await connection("Turma").select("Turma.id").update({ turma_id: turma_id })

        res.status(201).send({ message: "Turma mudado com sucesso", mudarModuloTurma })

    } catch (err: any) {

        res.status(500).send({ mesagem: err.message })
    }

};

function getEstudanteID(id: any): any {
    throw new Error("Function not implemented.");
}
