import connection from "../../dados/connection"
import { especialidade } from "../../interfaces/especialidade"

export const getEspecialidadeById = async (id: string): Promise<especialidade[]> => {

    const result = await connection('Docente_especialidade')
        .select()
        .innerJoin('Especialidade', 'Especialidade.id', 'Docente_especialidade.especialidade_id')
        .where('Docente_especialidade.docente_id', `${id}`)

    return result.map((item: especialidade) => {
        return {
            id: item.id,
            nome: item.nome
        }
    })
}