
export class Turma {

  private id: string
  private nome: string
  private modulo: string

  constructor(
    id: string,
    nome: string,
    modulo: string
  ) {

    this.id = id,
      this.nome = nome,
      this.modulo = modulo

  }
  public getNome(): string { return this.nome }
  public getID(): string { return this.id }
  public getModulo(): string { return this.modulo }



};