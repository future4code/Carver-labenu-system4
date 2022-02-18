import { app } from "./app"
import { createTurma } from "./endpoints/criarTurma"
import { GetAllTurma, GetTurma, MudarTurma } from "./endpoints/pegarTurma"
import { createStudent } from './endpoints/createStudent'
import { getStudents } from './endpoints/getStudent'
import {chageClassStudent} from './endpoints/chageClassStudent'


const mensagem: string = "oi oi oi"
console.log(mensagem)

app.get("/turma/all", GetAllTurma)

app.post("/turma", createTurma)

app.get("/turma", GetTurma)

app.put("/turma/mudar", MudarTurma)

app.get("/estudante", getStudents)

app.post("/estudante", createStudent)

app.put("/estudante/:id", chageClassStudent)
