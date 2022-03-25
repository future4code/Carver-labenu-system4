import connection from "../../dados/connection"
import { hobby } from "../../interfaces/hobby"

export const pegarHobbyPorId = async (id: string): Promise<hobby[]> => {

    const result: hobby[] = await connection('Estudante_Hobby')
        .select()
        .innerJoin('Hobby', 'Estudante_Hobby.hobby_id', 'Hobby.id')
        .where('Estudante_Hobby.estudante_id', `${id}`)

    return result.map((item: hobby) => {
        return {
            id: item.id,
            nome: item.nome
        }
    })
}