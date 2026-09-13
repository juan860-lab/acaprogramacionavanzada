const express = require('express');
const app = express();
const PORT = 3000;

const estudiantes = require('./datos');
const {
  listarEstudiantes,
  buscarPorId,
  buscarPorCarrera,
  obtenerAprobados,
  obtenerReprobados,
  calcularPromedioGeneral,
  obtenerMejorEstudiante,
  obtenerPeorEstudiante,
  contarPorCarrera,
  buscarPorSemestre,
  buscarMayoresDeEdad,
  generarReporte,
  generarRanking
} = require('./logica');

app.use(express.json());

// Ejecución inicial del reporte en consola al arrancar
generarReporte(estudiantes);

// 1. GET /estudiantes
app.get('/estudiantes', (req, res) => {
  res.json(listarEstudiantes(estudiantes));
});

// 2. GET /estudiantes/:id
app.get('/estudiantes/:id', (req, res) => {
  const resultado = buscarPorId(estudiantes, req.params.id);
  typeof resultado === 'string'
    ? res.status(404).json({ error: resultado })
    : res.json(resultado);
});

// 3. GET /carrera/:nombre
app.get('/carrera/:nombre', (req, res) => {
  res.json(buscarPorCarrera(estudiantes, req.params.nombre));
});

// 4. GET /aprobados
app.get('/aprobados', (req, res) => {
  res.json(obtenerAprobados(estudiantes));
});

// 5. GET /reprobados
app.get('/reprobados', (req, res) => {
  res.json(obtenerReprobados(estudiantes));
});

// 6. GET /promedio-general
app.get('/promedio-general', (req, res) => {
  res.json({ promedioGeneral: calcularPromedioGeneral(estudiantes) });
});

// 7. GET /mejor-estudiante
app.get('/mejor-estudiante', (req, res) => {
  res.json(obtenerMejorEstudiante(estudiantes));
});

// 8. GET /peor-estudiante
app.get('/peor-estudiante', (req, res) => {
  res.json(obtenerPeorEstudiante(estudiantes));
});

// 9. GET /contar-carreras
app.get('/contar-carreras', (req, res) => {
  res.json(contarPorCarrera(estudiantes));
});

// 10. GET /semestre/:numero
app.get('/semestre/:numero', (req, res) => {
  res.json(buscarPorSemestre(estudiantes, req.params.numero));
});

// 11. GET /mayores/:edad
app.get('/mayores/:edad', (req, res) => {
  res.json(buscarMayoresDeEdad(estudiantes, req.params.edad));
});

// 12. GET /reporte
app.get('/reporte', (req, res) => {
  res.json(generarReporte(estudiantes));
});


app.get('/ranking', (req, res) => {
  const rankingArray = generarRanking(estudiantes);
  
  // Unimos el arreglo con saltos de línea
  const listaTexto = "===== RANKING =====\n\n" + rankingArray.join('\n');
  
  // Enviamos como texto plano para que el navegador respete los saltos de línea
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(listaTexto);
});
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});