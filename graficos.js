// Obtener usuarios guardados
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Contar por roles
const administradores = usuarios.filter(
    usuario => usuario.rol === "Administrador"
).length;

const profesores = usuarios.filter(
    usuario => usuario.rol === "Profesor"
).length;

const estudiantes = usuarios.filter(
    usuario => usuario.rol === "Estudiante"
).length;

// Total usuarios
const totalUsuarios = usuarios.length;

// Actualizar HTML
document.getElementById("totalUsuarios").textContent = totalUsuarios;
document.getElementById("totalAdministradores").textContent = administradores;
document.getElementById("totalProfesores").textContent = profesores;
document.getElementById("totalEstudiantes").textContent = estudiantes;

// Crear gráfica
const ctx = document.getElementById("grafico1");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Administradores", "Profesores", "Estudiantes"],
        datasets: [{
            label: "Cantidad de usuarios",
            data: [administradores, profesores, estudiantes],
            backgroundColor: ["#0f766e", "#84cc16", "#14b8a6"],
            borderRadius: 10
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Distribución de Usuarios por Rol"
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});