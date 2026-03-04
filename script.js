let intentos = 0;
const MAX_INTENTOS = 3;

function verificarDatos(usuario, contrasena) {
    return (usuario === "admin@gmail.com" && contrasena === "1234");
}

document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let usuario = document.getElementById("email").value;
    let contrasena = document.getElementById("password").value;
    let rol = document.getElementById("rol").value;

    console.log("Usuario:", usuario);
    console.log("Contraseña:", contrasena);
    console.log("Rol:", rol);

    if (intentos >= MAX_INTENTOS) {
        alert("🚫 Usuario bloqueado");
        return;
    }

    if (verificarDatos(usuario, contrasena)) {
        alert("✅ Acceso permitido");
        window.location.href = "dashboard.html";
    } else {
        intentos++;
        alert("❌ Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS);
    }

});