import { Usuario } from "./classeUsuario"

export class Estudante extends Usuario {
    private hobby: string[]

    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: string,
        hobby: string[],
        turma_id: string
    ) {
        super(id, nome, email, data_nasc, turma_id)
        this.hobby = hobby
    }

    public getHobby(): string[] {
        return this.hobby
    }
}