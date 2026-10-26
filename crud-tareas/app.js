
const express = require('express');

const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

// Array donde guardaremos las tareas
let tareas = [];
let siguienteId = 1;

// 1. GET: obtener todas las tareas
app.get('/tareas', (req, res) => {
    res.status(200).json(tareas);
});

// 2. GET: obtener una tarea por su ID
app.get('/tareas/:id', (req, res) => {
    const id = Number(req.params.id);

    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return res.status(404).json({
            error: 'Tarea no encontrada'
        });
    }

    res.status(200).json(tarea);
});

// 3. POST: crear una tarea
app.post('/tareas', (req, res) => {
    const nuevaTarea = {
        id: siguienteId++,
        titulo: req.body.titulo,
        hecha: req.body.hecha ?? false
    };

    tareas.push(nuevaTarea);

    res.status(201).json(nuevaTarea);
});

// 4. PUT: actualizar una tarea
app.put('/tareas/:id', (req, res) => {
    const id = Number(req.params.id);

    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return res.status(404).json({
            error: 'Tarea no encontrada'
        });
    }

    tarea.titulo = req.body.titulo;
    tarea.hecha = req.body.hecha;

    res.status(200).json(tarea);
});

// 5. DELETE: eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
    const id = Number(req.params.id);

    const indice = tareas.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: 'Tarea no encontrada'
        });
    }

    tareas.splice(indice, 1);

    res.status(204).end();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
