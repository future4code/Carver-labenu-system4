export function retornarIdade(data_nasc: string) {
    const informedBirth: string[] = data_nasc.split('/')
    const novaDataNasc = new Date(Number(informedBirth[2]), Number(informedBirth[1]) - 1, Number(informedBirth[0])).getTime()
    const dataAtual = new Date().getTime()
    const age: number = Math.floor((dataAtual - novaDataNasc) / 1000 / 60 / 60 / 24 / 365)
    return age
}