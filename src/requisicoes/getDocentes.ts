import connection from "../dados/connection"

export const getDocenteId = async (id: string): Promise<any[]> => {

    const getIdDocente = await connection("Turma")
        .select()
        .innerJoin("Docente", "Docente.turma_id", "Turma.id")
        .where('Turma.id', `${id}`)
    return getIdDocente.map((item: any) => {
        return {
            id: item.id,
            nome: item.nome
        }
    })
};