const express = require('express')

const app = express()

app.use(express.json())

const palabras = ['Frase', 'inicial']

app.get('/api/frase', (req, res) => {
    res.send({ frase: palabras.join(' ') })
})

app.get('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    res.send({ buscada: palabras[parseInt(pos) - 1] })
})

app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body
    palabras.push(palabra)
    res.send({ agregada: palabra, posicion: palabras.length })
})

app.post('/coder', (req, res) => {
    const objeto = req.body;
    console.log(objeto)
    let valor = validarEdad(objeto.edad);
    if(valor){
        res.send({
            mensaje: "Puede entrar"
        })
    }else{
        res.send({
            mensaje: "No puede entrar"
        })
    }

}) 

app.put('/api/palabras/:pos', (req, res) => {
    const { palabra } = req.body
    const { pos } = req.params
    const palabraAnt = palabras[parseInt(pos) - 1]
    palabras[parseInt(pos) - 1] = palabra
    res.send({ actualizada: palabra, anterior: palabraAnt })
})

app.delete('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const palabra = palabras.splice(parseInt(pos) - 1, 1)
    res.send({ borrada: palabra })
})


const validarEdad = (edad) => {
    if(edad >= 18){
        return true;
    }else{
        return false;
    }
}

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
