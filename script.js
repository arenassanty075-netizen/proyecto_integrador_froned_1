console.log(window.location.pathname);
console.log(localStorage.getItem("logueado"));
/* =========================
   PROTEGER DASHBOARD
========================= */

const logueado = localStorage.getItem("logueado");

if (
    window.location.pathname.includes("dashboard.html") &&
    logueado !== "true"
) {
    window.location.href = "login.html";
}
let intentos = parseInt(localStorage.getItem("intentos")) || 0;
const MAX_INTENTOS = 3;

/* =========================
   LOGIN
========================= */

function verificarDatos(usuario, contrasena) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    return usuarios.find(u =>
        u.email === usuario && u.password === contrasena
    );
}

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let usuario = document.getElementById("email").value;
        let contrasena = document.getElementById("password").value;

        if (intentos >= MAX_INTENTOS) {
            alert("Usuario bloqueado");
            return;
        }

        const userFound = verificarDatos(usuario, contrasena);

        if (userFound) {

            alert("Acceso permitido");

            // guardar sesión
            localStorage.setItem("usuarioLogueado", JSON.stringify(userFound));
            localStorage.setItem("logueado", "true");

            // reset intentos
            localStorage.removeItem("intentos");

            window.location.href = "dashboard.html";

        } else {

            intentos++;
            localStorage.setItem("intentos", intentos);

            alert("Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS);
        }
    });
}


/* =========================
   CRUD USUARIOS
========================= */

let lista = document.getElementById("lista");

if (lista) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let boton = document.getElementById("agregar");

    function mostrarUsuarios() {

        lista.innerHTML = "";

        usuarios.forEach((user, index) => {
            lista.innerHTML += `
                <p>
                    ${user.nombre} - ${user.email}
                    <button onclick="eliminarUsuario(${index})">Eliminar</button>
                </p>
            `;
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    boton.addEventListener("click", () => {

        if (!nombre.value || !email.value || !password.value) {
            alert("Completa todos los campos");
            return;
        }

        usuarios.push({
            nombre: nombre.value,
            email: email.value,
            password: password.value
        });

        mostrarUsuarios();

        nombre.value = "";
        email.value = "";
        password.value = "";
    });

    window.eliminarUsuario = function (index) {
        usuarios.splice(index, 1);
        mostrarUsuarios();
    }

    mostrarUsuarios();
}


/* =========================
   REGISTRO
========================= */

function registrar() {

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!nombre || !email || !password) {
        alert("Inputs no existen en el HTML");
        return;
    }

    if (!nombre.value || !email.value || !password.value) {
        alert("Completa todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.email === email.value);

    if (existe) {
        alert("Este usuario ya existe");
        return;
    }

    usuarios.push({
        nombre: nombre.value,
        email: email.value,
        password: password.value
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");

    window.location.href = "login.html";
}
/* =========================
   USUARIO LOGUEADO
========================= */

const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuarioLogueado")
);

const bienvenida = document.getElementById("bienvenida");

if (usuarioLogueado && bienvenida) {
    bienvenida.textContent =
        "Bienvenido, " + usuarioLogueado.nombre;
}
/* =========================
   CERRAR SESIÓN
========================= */

function logout() {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("logueado");

    window.location.href = "login.html";
}
async function cargarUsuariosJson() {
    try {

        const respuesta = await fetch("usuarios.json");

        const usuariosJson = await respuesta.json();

         // Guardar usuarios JSON en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuariosJson));

        usuariosJson.forEach(usuario => {

            lista.innerHTML += `
                <p>
                    ${usuario.nombre} - ${usuario.email}
                </p>
            `;

        });

    } catch (error) {
        console.error("Error al cargar usuarios.json", error);
    }
}
cargarUsuariosJson();