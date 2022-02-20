export const buscarDataNascFormatada = (data: string) => {
    let newDate: Date = new Date(data)
    const newFormattedDate: string = ((newDate.getDate())) + "/" + ((newDate.getMonth() + 1)) + "/" + newDate.getFullYear()
    return newFormattedDate
}