import { Usuario } from "./classeUsuario";

export class Docente extends Usuario {

    protected especialidade: string[]

    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: string,
        turma_id: string,
        especialidade: string[]
    ) {
        super(id, nome, email, data_nasc, turma_id);
        this.especialidade = especialidade
    }
    public getEspecialidades(): string[] {
        return this.especialidade
    }
}