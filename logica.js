const estudiantes = require('./datos');

// 1. Buscar estudiante por ID (uso de ciclo FOR e IF)
function buscarPorId(id) {
  let estudianteEncontrado = null;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].id === Number(id)) {
      estudianteEncontrado = estudiantes[i];
      break;
    }
  }
  return estudianteEncontrado;
}

// 2. Filtrar por carrera (uso de WHILE)
function filtrarPorCarrera(carrera) {
  let resultado = [];
  let i = 0;
  while (i < estudiantes.length) {
    if (estudiantes[i].carrera.toLowerCase() === carrera.toLowerCase()) {
      resultado[resultado.length] = estudiantes[i]; // Agrega nativamente al array
    }
    i++;
  }
  return resultado;
}

// 3. Filtrar por semestre
function filtrarPorSemestre(semestre) {
  let resultado = [];
  for (let i = 0; i < estudiantes.length; i++) {
    estudiantes[i].semestre === Number(semestre) 
      ? (resultado[resultado.length] = estudiantes[i]) 
      : null; // Operador Ternario
  }
  return resultado;
}

// 4. Obtener Aprobados (promedio >= 3.0) y Reprobados (promedio < 3.0)
function clasificarEstado() {
  let aprobados = [];
  let reprobados = [];
  let i = 0;

  do {
    if (estudiantes.length === 0) break;
    
    // Operador ternario para clasificación nativa
    estudiantes[i].promedio >= 3.0 
      ? (aprobados[aprobados.length] = estudiantes[i])
      : (reprobados[reprobados.length] = estudiantes[i]);

    i++;
  } while (i < estudiantes.length);

  return { aprobados, reprobados };
}

// 5. Calcular Promedio General e Identificar el Rendimiento
function calcularPromedios() {
  let sumaPromedios = 0;
  let contador = 0;

  for (let i = 0; i < estudiantes.length; i++) {
    sumaPromedios += estudiantes[i].promedio;
    contador++;
  }

  let promedioGeneral = contador > 0 ? (sumaPromedios / contador) : 0;
  
  return {
    totalEstudiantes: contador,
    promedioGeneral: Number(promedioGeneral.toFixed(2))
  };
}

module.exports = {
  buscarPorId,
  filtrarPorCarrera,
  filtrarPorSemestre,
  clasificarEstado,
  calcularPromedios
};