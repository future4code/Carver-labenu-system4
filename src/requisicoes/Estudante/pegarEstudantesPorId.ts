import connection from "../../dados/connection"
import { estudante } from "../../interfaces/estudante"

export const pegarEstudantesPorId = async (id: string): Promise<estudante[]> => {

    const getIdEstudante = await connection("Turma")
        .select()
        .innerJoin("Estudante", "Estudante.turma_id", "Turma.id")
        .where('Turma.id', `${id}`)

    return getIdEstudante.map((item: estudante) => {
        return {
            id: item.id,
            nome: item.nome
        }
    })
}