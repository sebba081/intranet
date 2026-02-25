document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    const body = document.body;

    function setTheme(mode) {
        body.classList.remove("light-mode", "dark-mode");
        body.classList.add(`${mode}-mode`);
        toggleBtn.textContent = mode === "dark" ? "☀️" : "🌙";
        localStorage.setItem("theme", mode);
    }

    toggleBtn.addEventListener("click", () => {
        const isDark = body.classList.contains("dark-mode");
        setTheme(isDark ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
});
