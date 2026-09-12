const express = require('express');
const app = express();
const PORT = 3000;

// Importación de las funciones lógicas
const {
  buscarPorId,
  filtrarPorCarrera,
  filtrarPorSemestre,
  clasificarEstado,
  calcularPromedios
} = require('./logica');

app.use(express.json());

// Ruta 1: Buscar por ID -> http://localhost:3000/estudiantes/1
app.get('/estudiantes/:id', (req, res) => {
  const estudiante = buscarPorId(req.params.id);
  estudiante 
    ? res.json({ exito: true, data: estudiante })
    : res.status(404).json({ exito: false, mensaje: "Estudiante no encontrado" });
});

// Ruta 2: Filtrar por Carrera -> http://localhost:3000/carrera/Ingeniería de Sistemas
app.get('/carrera/:nombreCarrera', (req, res) => {
  const resultado = filtrarPorCarrera(req.params.nombreCarrera);
  res.json({ total: resultado.length, data: resultado });
});

// Ruta 3: Filtrar por Semestre -> http://localhost:3000/semestre/5
app.get('/semestre/:numeroSemestre', (req, res) => {
  const resultado = filtrarPorSemestre(req.params.numeroSemestre);
  res.json({ total: resultado.length, data: resultado });
});

// Ruta 4: Reporte de Aprobados y Reprobados -> http://localhost:3000/reporte/estado
app.get('/reporte/estado', (req, res) => {
  const reporte = clasificarEstado();
  res.json(reporte);
});

// Ruta 5: Métricas y Promedio General -> http://localhost:3000/reporte/promedios
app.get('/reporte/promedios', (req, res) => {
  const promedios = calcularPromedios();
  res.json(promedios);
});

// Servidor en escucha
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Rutas disponibles:`);
  console.log(` - GET /estudiantes/:id`);
  console.log(` - GET /carrera/:nombreCarrera`);
  console.log(` - GET /semestre/:numeroSemestre`);
  console.log(` - GET /reporte/estado`);
  console.log(` - GET /reporte/promedios`);
  console.log(`====================================================`);
});