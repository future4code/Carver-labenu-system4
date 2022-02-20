import { Request, Response } from 'express';
import { Docente } from '../../classes/classeDocente';
import connection from '../../dados/connection';
import { pegarEspecialidade } from '../../requisicoes/Docente/pegarEspecialidade';
import { geradorId } from '../../servicos/geradorId';

export const criarDocente = async (req: Request, res: Response): Promise<void> => {
    let errorCode: number = 400
    const token = req.headers.authorization
    const id = new geradorId().execute()
    const { nome, email, data_nasc, especialidades }: { nome: string, email: string, data_nasc: string, especialidades: string[] } = req.body
    const turma_id: string = '0'

    try {

        if (!token) {
            errorCode = 401
            throw new Error("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!nome || !email || !data_nasc || !especialidades) {
            errorCode = 400
            throw new Error("Para realizar o cadastro de um novo docente é necessário informar os seguintes campos: nome, email, data_nasc, especialidades.");
        }

        if (!email.includes('@') || !email.includes('.com')) {
            errorCode = 422;
            throw new Error("Formato de email inválido");
        }

        const docente = new Docente(id, nome, email, data_nasc, turma_id, especialidades)

        for (let j = 0; j < especialidades.length; j++) {

            const especialidade = await pegarEspecialidade(especialidades[j])

            if (especialidade.length < 1) {
                errorCode = 404
                throw new Error("Essa espcialidade não existe, por gentileza informar uma válida: 'REACT', 'REDUX', 'CSS', 'TESTES', 'TYPESCRIPT', 'POO', 'BACKEND'");
            }
        }

        await connection('Docente')
            .insert({
                id: docente.getId(),
                nome: docente.getNome(),
                email: docente.getEmail(),
                data_nasc: docente.setEnviarDataNascFormatada(data_nasc),
                turma_id: docente.getTurma()
            })

        for (let j = 0; j < especialidades.length; j++) {
            const especialidade = await pegarEspecialidade(especialidades[j])

            await connection('Docente_especialidade')
                .insert({
                    id: Date.now().toString(),
                    docente_id: docente.getId(),
                    especialidade_id: especialidade[0].id
                })
        }

        res.status(201).send()

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}