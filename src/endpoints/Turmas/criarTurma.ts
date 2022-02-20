import { Request, Response } from "express"
import { Turma } from "../../classes/classeTurma";
import connection from "../../dados/connection";
import { geradorId } from "../../servicos/geradorId";

export const criarTurma = async (req: Request, res: Response): Promise<void> => {

    let errorCode: number = 400;
    const nome: string = req.body.nome
    const token = req.headers.authorization
    const id = new geradorId().execute()
    const modulo: string = '0'

    try {

        if (!token) {
            errorCode = 401
            throw new Error("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!nome) {
            errorCode = 404
            throw new Error("Para realizar o cadastro de uma nova turma é necessário informar o seguinte campos: nome")
        }

        const newTurma = new Turma(id, nome, modulo)

        await connection("Turma").insert({
            id,
            nome: newTurma.getNome(),
            modulo: newTurma.getModulo()
        })

        res.status(201).send()

    } catch (error: any) {
        res.status(errorCode).send({ mensagem: error.message })
    }

};