import { Request, Response } from 'express'
import connection from "../dados/connection"
import { buscarDataNascFormatada } from '../funcoes/buscarData'
import { getEstudantePorNome } from '../requisicoes/getEstudantePorNome'
import { getHobbyById } from '../requisicoes/getHobbyById'



export const getStudents = async (req: Request, res: Response): Promise<void>=> {
    let errorCode: number = 400
    const search = req.query.search as string

    try {

        if (search) {
            const estudante = await getEstudantePorNome(search)

            if(estudante.length < 1){
                errorCode = 404
                throw new Error("Estudante não localizado, por gentileza, verificar o nome e tentar buscar novamente")
            }

            res.status(200).send({ estudante })
        }

        const estudante = await connection('Estudante').select()

        for (let i = 0; i < estudante.length; i++) {
            estudante[i].hobby = await getHobbyById(estudante[i].id)
        }

        const estudantes = estudante.map((item) =>{
            
            return ({
                id: item.id,
                nome: item.nome,
                email: item.email,
                data_nasc: buscarDataNascFormatada(item.data_nasc),
                turma_id: item.turma_id,
                hobby: item.hobby
                
            })
        })
        res.status(200).send({ estudantes })

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message || error.sqlMessage })
    }

}