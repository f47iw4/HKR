document.addEventListener("DOMContentLoaded", () => {
    // Verificar si ya existe la cookie
    if (!getCookie("cookies_aceptadas")) {
        document.getElementById("cookie-banner").style.display = "block";
    }

    document.getElementById("accept-cookies").addEventListener("click", () => {
        setCookie("cookies_aceptadas", "true", 365);
        document.getElementById("cookie-banner").style.display = "none";
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }
});
