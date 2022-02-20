import { app } from "./app"
import { createTurma } from "./endpoints/Turmas/criarTurma"
import { criarDocente } from "./endpoints/Docentes/criarDocente"
import { mudarClasseEstudante } from "./endpoints/Estudantes/mudarClasseEstudante"
import { buscarTurmasAtivas } from "./endpoints/Turmas/bucarTurmasAtivas"
import { pegarTodasTurmas } from "./endpoints/Turmas/pegarTodasTurmas"
import { mudarModuloTurma } from "./endpoints/Turmas/mudarModuloTurma"
import { mudarClasseDocente } from "./endpoints/Docentes/mudarClasseDocente"
import { criarEstudante } from "./endpoints/Estudantes/criarEstudante"
import { pegarEstudante } from "./endpoints/Estudantes/pegarEstudante"
import { pegarDocentes } from "./endpoints/Docentes/pegarDocente"

app.get("/turma/ativas", buscarTurmasAtivas)
app.get('/turma', pegarTodasTurmas)
app.post("/turma", createTurma)
app.put("/turma", mudarModuloTurma)

app.get("/estudante", pegarEstudante)
app.post("/estudante", criarEstudante)
app.put("/estudante/:id", mudarClasseEstudante)

app.get('/docente', pegarDocentes)
app.post('/docente', criarDocente)
app.put("/docente/:id", mudarClasseDocente)