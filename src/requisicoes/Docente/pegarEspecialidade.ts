import connection from "../../dados/connection"
import { especialidade } from "../../interfaces/especialidade"

export const pegarEspecialidade = async (nome?: string): Promise<especialidade[]> => {

        const result =  await connection("Especialidade")
        .select()
        .where("Especialidade.nome", 'like', `${nome}`)
  
    return result
}