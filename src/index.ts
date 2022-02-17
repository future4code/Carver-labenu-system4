import {app} from './app'
import { createStudent } from './endpoints/createStudent'
import { getStudents } from './endpoints/getStudent'
import {chageClassStudent} from './endpoints/chageClassStudent'

app.get("/estudante", getStudents)
app.post("/estudante", createStudent)
app.put("/estudante/:id", chageClassStudent)
