import connection from "../dados/connection"

export const getEstudantesId = async (id: string): Promise<any[]> => {

    const getIdEstudante = await connection("Turma")
        .select()
        .innerJoin("Estudante", "Estudante.turma_id", "Turma.id")
        .where('Turma.id', `${id}`)
    return getIdEstudante.map((item: any) => {
        return {
            id: item.id,
            nome: item.nome
        }
    })
};