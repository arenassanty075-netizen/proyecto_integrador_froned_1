document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    if (intentos >= MAX_INTENTOS) {
        alert("🚫 Usuario bloqueado");
        return;
    }

    if (verificarDatos(usuario, contraseña)) {
        alert("✅ Acceso permitido");
        window.location.href = "dashboard.html";
    } else {
        intentos++;
        alert("❌ Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS);
    }

});