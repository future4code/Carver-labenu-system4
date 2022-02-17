import connection from "../dados/connection"
import { estudante } from "../interfaces/estudante"
import { getHobbyById } from "./getHobbyById"

export const getEstudantePorNome = async (aluno: string): Promise<estudante[]> => {
    
    const dataFormatada = (data: string) => {
        let newDate: Date = new Date(data)
        const newFormattedDate: string = ((newDate.getDate())) + "/" + ((newDate.getMonth() + 1)) + "/" + newDate.getFullYear()
        return newFormattedDate
    }

    const result = await connection('Estudante')
        .select()
        .where('Estudante.nome', 'like', `${aluno}`)
    
        for(let i = 0; i < result.length; i++){
            result[i].hobby = await getHobbyById(result[i].id)
        }
        
        const estudante = result.map((item) =>{
            return ({
                id: item.id,
                nome: item.nome,
                email: item.email,
                data_nasc: dataFormatada(item.data_nasc),
                turma_id: item.turma_id,
                hobby: item.hobby
            })
        })

    return estudante
}