const estudiantes = require('./datos');

// 1. Listar todos los estudiantes
function listarEstudiantes(lista) {
  let resultado = [];
  for (let i = 0; i < lista.length; i++) {
    resultado[resultado.length] = lista[i];
  }
  return resultado;
}

// 2. Buscar estudiante por ID
function buscarPorId(lista, id) {
  let encontrado = null;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === Number(id)) {
      encontrado = lista[i];
      break;
    }
  }
  return encontrado ? encontrado : "Estudiante no encontrado";
}

// 3. Buscar estudiantes por carrera
function buscarPorCarrera(lista, carrera) {
  let resultado = [];
  let i = 0;
  while (i < lista.length) {
    if (lista[i].carrera.toLowerCase() === carrera.toLowerCase()) {
      resultado[resultado.length] = lista[i];
    }
    i++;
  }
  return resultado;
}

// 4. Obtener estudiantes aprobados (promedio >= 3.0)
function obtenerAprobados(lista) {
  let aprobados = [];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].promedio >= 3.0) {
      aprobados[aprobados.length] = lista[i];
    }
  }
  return aprobados;
}

// 5. Obtener estudiantes reprobados (promedio < 3.0)
function obtenerReprobados(lista) {
  let reprobados = [];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].promedio < 3.0) {
      reprobados[reprobados.length] = lista[i];
    }
  }
  return reprobados;
}

// 6. Calcular el promedio general
function calcularPromedioGeneral(lista) {
  if (lista.length === 0) return 0;
  let suma = 0;
  for (let i = 0; i < lista.length; i++) {
    suma += lista[i].promedio;
  }
  let promedio = suma / lista.length;
  return Number(promedio.toFixed(2));
}

// 7. Encontrar al mejor estudiante (promedio más alto)
function obtenerMejorEstudiante(lista) {
  if (lista.length === 0) return null;
  let mejor = lista[0];
  for (let i = 1; i < lista.length; i++) {
    if (lista[i].promedio > mejor.promedio) {
      mejor = lista[i];
    }
  }
  return mejor;
}

// 8. Encontrar al estudiante con menor promedio
function obtenerPeorEstudiante(lista) {
  if (lista.length === 0) return null;
  let menor = lista[0];
  for (let i = 1; i < lista.length; i++) {
    if (lista[i].promedio < menor.promedio) {
      menor = lista[i];
    }
  }
  return menor;
}

// 9. Contar estudiantes por carrera
function contarPorCarrera(lista) {
  let conteo = {};
  for (let i = 0; i < lista.length; i++) {
    let carrera = lista[i].carrera;
    conteo[carrera] = conteo[carrera] ? conteo[carrera] + 1 : 1;
  }
  return conteo;
}

// 10. Buscar estudiantes por semestre
function buscarPorSemestre(lista, semestre) {
  let resultado = [];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].semestre === Number(semestre)) {
      resultado[resultado.length] = lista[i];
    }
  }
  return resultado;
}

// 11. Obtener estudiantes mayores de cierta edad
function buscarMayoresDeEdad(lista, edad) {
  let resultado = [];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].edad > Number(edad)) {
      resultado[resultado.length] = lista[i];
    }
  }
  return resultado;
}

// 12. Generar reporte general en consola utilizando las funciones anteriores
function generarReporte(lista) {
  const total = lista.length;
  const aprobados = obtenerAprobados(lista).length;
  const reprobados = obtenerReprobados(lista).length;
  const promGeneral = calcularPromedioGeneral(lista);
  const mejor = obtenerMejorEstudiante(lista);
  const peor = obtenerPeorEstudiante(lista);

  console.log("\n========== REPORTE ACADÉMICO ==========");
  console.log(`Total de estudiantes: ${total}`);
  console.log(`Estudiantes aprobados: ${aprobados}`);
  console.log(`Estudiantes reprobados: ${reprobados}`);
  console.log(`Promedio general: ${promGeneral}`);
  console.log(`Mejor estudiante: ${mejor ? mejor.nombre + " (" + mejor.promedio + ")" : "N/A"}`);
  console.log(`Estudiante con menor promedio: ${peor ? peor.nombre + " (" + peor.promedio + ")" : "N/A"}`);
  console.log("========================================\n");

  return {
    totalEstudiantes: total,
    estudiantesAprobados: aprobados,
    estudiantesReprobados: reprobados,
    promedioGeneral: promGeneral,
    mejorEstudiante: mejor,
    estudianteMenorPromedio: peor
  };
}

// RETO ADICIONAL: Generar Ranking formateado (Posición. Nombre - Promedio)
function generarRanking(lista) {
  let copia = [];
  for (let i = 0; i < lista.length; i++) {
    copia[copia.length] = lista[i];
  }

  for (let i = 0; i < copia.length - 1; i++) {
    for (let j = 0; j < copia.length - 1 - i; j++) {
      if (copia[j].promedio < copia[j + 1].promedio) {
        let temp = copia[j];
        copia[j] = copia[j + 1];
        copia[j + 1] = temp;
      }
    }
  }

  let rankingFormateado = [];
  for (let i = 0; i < copia.length; i++) {
    rankingFormateado[rankingFormateado.length] = `${i + 1}. ${copia[i].nombre} - ${copia[i].promedio}`;
  }

  return rankingFormateado;
}

module.exports = {
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
};