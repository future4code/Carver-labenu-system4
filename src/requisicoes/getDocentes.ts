import connection from "../dados/connection"
import { docente } from "../interfaces/docente";

export const getDocenteId = async (id: string): Promise<docente[]> => {

    const getIdDocente = await connection("Turma")
        .select()
        .innerJoin("Docente", "Docente.turma_id", "Turma.id")
        .where('Turma.id', `${id}`)
    return getIdDocente.map((item: docente) => {
        return {
            id: item.id,
            nome: item.nome
        }
    })
};