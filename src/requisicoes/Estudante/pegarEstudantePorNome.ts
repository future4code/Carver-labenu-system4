import connection from "../../dados/connection"
import { estudante } from "../../interfaces/estudante"
import { buscarDataNascFormatada } from "../../servicos/buscarDataNascFormatada"
import { retornarIdade } from "../../servicos/retornarIdade"
import { pegarEstudantesPorId } from "./pegarEstudantesPorId"

export const pegarEstudantePorNome = async (aluno: string): Promise<estudante[]> => {

    const result = await connection('Estudante')
        .select()
        .where('Estudante.nome', 'like', `${aluno}`)

    for (let i = 0; i < result.length; i++) {
        result[i].hobby = await pegarEstudantesPorId(result[i].id)
    }

    const estudante = result.map((item: any) => {
        return ({
            id: item.id,
            nome: item.nome,
            email: item.email,
            data_nasc: buscarDataNascFormatada(item.data_nasc),
            idade: `${retornarIdade(buscarDataNascFormatada(item.data_nasc))} anos`,
            turma_id: item.turma_id,
            hobby: item.hobby
        })
    })

    return estudante
}