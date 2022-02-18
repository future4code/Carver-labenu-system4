import { Request, Response } from "express"
import connection from "../dados/connection"
import { IdGenerator } from "../servicos/IdGenerator"
import { Turma } from "../Turma/turma"

export const createTurma = async (req: Request, res: Response): Promise<void> => {

    let errorCode: number = 400;


    try {

        const { nome, modulo }: { nome: string, modulo: string } = req.body
        const id = new IdGenerator().execute()

        if (modulo > "6") {
            errorCode = 422
            throw new Error("'modulo' só aceita numeros de 0-6")
        }


        const newTurma = new Turma(
            id,
            nome,
            modulo
        )


        await connection("Turma").insert({
            id,
            nome: newTurma.getNome(),
            modulo: newTurma.getModulo()
        })

        res.status(201).send()

    } catch (err: any) {
        res.status(500).send({ mensagem: err.message })
    }

};