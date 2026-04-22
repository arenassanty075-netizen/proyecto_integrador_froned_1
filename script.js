let intentos = 0;
const MAX_INTENTOS = 3;

function verificarDatos(usuario, contrasena) {
    return usuario === "admin@gmail.com" && contrasena === "1234";
}

// FIX: evitar error en dashboard
let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let usuario = document.getElementById("email").value;
        let contrasena = document.getElementById("password").value;
        let rol = document.getElementById("rol").value;

        console.log("Usuario:", usuario);
        console.log("Contraseña:", contrasena);
        console.log("Rol:", rol);

        if (intentos >= MAX_INTENTOS) {
            alert("Usuario bloqueado");
            return;
        }

        if (verificarDatos(usuario, contrasena)) {
            alert(" Acceso permitido");
            window.location.href = "dashboard.html";
        } else {
            intentos++;
            alert(" Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS);
        }

    });

}



// CRUD USUARIOS (AGREGADO)


let lista = document.getElementById("lista");

if (lista) {

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let nombre = document.getElementById("nombre");
  let rolUser = document.getElementById("rolUser");
  let boton = document.getElementById("agregar");

  function mostrarUsuarios() {
    lista.innerHTML = "";

    usuarios.forEach((user, index) => {
      lista.innerHTML += `
        <p>
          ${user.nombre} - ${user.rol}
          <button onclick="eliminarUsuario(${index})">Eliminar</button>
        </p>
      `;
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  boton.addEventListener("click", () => {

    if (nombre.value === "" || rolUser.value === "") {
      alert(" Completa los campos");
      return;
    }

    usuarios.push({
      nombre: nombre.value,
      rol: rolUser.value
    });

    mostrarUsuarios();

    nombre.value = "";
    rolUser.value = "";
  });

  window.eliminarUsuario = function(index) {
    usuarios.splice(index, 1);
    mostrarUsuarios();
  }

  mostrarUsuarios();
}