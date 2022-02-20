import { Request, Response } from 'express';
import connection from '../../dados/connection';
import { getEspecialidadeById } from '../../requisicoes/Docente/getEspecialidadeById';
import { buscarDataNascFormatada } from '../../servicos/buscarDataNascFormatada';

export const pegarDocentes = async (req: Request, res: Response) => {
    let errorCode: number = 400

    try {
        const docente = await connection('Docente')
        for (let i = 0; i < docente.length; i++) {
            docente[i].especialidades = await getEspecialidadeById(docente[i].id)
        }

        const docentes = docente.map((item) => {

            return ({
                id: item.id,
                nome: item.nome,
                email: item.email,
                data_nasc: buscarDataNascFormatada(item.data_nasc),
                turma_id: item.turma_id,
                especialidades: item.especialidade
            })
        })
        res.status(200).send({ docentes })

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message || error.sqlMessage })
    }
}
