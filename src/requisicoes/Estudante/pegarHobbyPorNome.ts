import connection from "../../dados/connection"
import { hobby } from "../../interfaces/hobby"

export const pegarHobbyPorNome = async (hobby: string): Promise<hobby[]> => {

    const result = await connection('Hobby')
        .select()
        .where('Hobby.nome', 'like', `${hobby}`)

    return result.map((item: hobby) => {
        return {
            id: item.id,
            nome: item.nome
        }
    })
}