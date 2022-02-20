import { Request, Response } from 'express'
import { Estudante } from '../../classes/classeEstudante'
import connection from '../../dados/connection'
import { pegarHobbyPorNome } from '../../requisicoes/Estudante/pegarHobbyPorNome'

export const criarEstudante = async (req: Request, res: Response): Promise<void> => {
    let errorCode: number = 400
    const token = req.headers.authorization

    const { nome, email, data_nasc, hobby }: { nome: string, email: string, data_nasc: string, hobby: string[] } = req.body
    const turma_id: string = '0'

    const id: string = Date.now().toString()

    try {
        const estudante = new Estudante(id, nome, email, data_nasc, hobby, turma_id)

        if (!token) {
            errorCode = 401
            throw new Error("Para realizar essa operação é necessário ter token de autorização")
        }

        if (!nome || !email || !data_nasc || !hobby) {
            errorCode = 404
            throw new Error("Para realizar o cadastro de um novo estudante é necessário informar os seguintes campos: nome, email, data_nasc, hobby.")
        }

        if (!email.includes('@') || !email.includes('.com')) {
            errorCode = 422;
            throw new Error("Formato de email inválido");
        }

        for (let i = 0; i < hobby.length; i++) {

            const hobbys = await pegarHobbyPorNome(hobby[i])

            if (hobbys.length < 1) {
                await connection('Hobby')
                    .insert({
                        id: Date.now().toString(),
                        nome: hobby[i]
                    })
            }
        }

        await connection('Estudante')
            .insert({
                id,
                nome: estudante.getNome(),
                email: estudante.getEmail(),
                data_nasc: estudante.setEnviarDataNascFormatada(data_nasc),
                turma_id: estudante.getTurma()
            })

            for(let j = 0; j < hobby.length; j++){

                const hobbys2 = await pegarHobbyPorNome(hobby[j])

                await connection('Estudante_Hobby')
                    .insert({
                        id: Date.now().toString(),
                        estudante_id: estudante.getId(),
                        hobby_id: hobbys2[0].id
                    })
            }

        res.status(201).send("Estudante cadastrado com sucesso")

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message || error.sqlMessage })
    }
}


