import { app } from "./app"
import { createTurma } from "./endpoints/criarTurma"
import { GetAllTurma, GetTurma, MudarTurma } from "./endpoints/pegarTurma"



const mensagem: string = "oi oi oi"
console.log(mensagem)

app.get("/turma/all", GetAllTurma)

app.post("/turma", createTurma)

app.get("/turma", GetTurma)

app.put("/turma/mudar", MudarTurma)

