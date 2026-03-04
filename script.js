document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let usuario = document.getElementById("email").value;
    let contrasena = document.getElementById("password").value;
    let rol = document.getElementById("rol").value;

    console.log("Usuario:", usuario);
    console.log("Contraseña:", contrasena);
    console.log("Rol:", rol);
});