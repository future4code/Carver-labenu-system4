import { Request, Response } from "express"
import connection from "../../dados/connection";
import { turma } from "../../interfaces/turma";
import { pegarDocentePorId } from "../../requisicoes/Docente/pegarDocentePorId ";
import { pegarEstudantesPorId } from "../../requisicoes/Estudante/pegarEstudantesPorId";

export const pegarTodasTurmas = async (req: Request, res: Response): Promise<void> => {

    try {

        const turmas = await connection("Turma").select()

        for (let i = 0; i < turmas.length; i++) {
            turmas[i].docentes = await pegarDocentePorId(turmas[i].id)
            turmas[i].estudantes = await pegarEstudantesPorId(turmas[i].id)
        }

        const result = turmas.map((item: turma) => {
            return ({
                id: item.id,
                nome: item.nome,
                modulo: item.modulo,
                docente: item.docentes,
                estudantes: item.estudantes
            })
        })

        res.status(201).send(result)
    }

    catch (err: any) {
        res.status(500).send({ mensagem: err.message })
    }
}


