document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  function syncToggle(mode) {
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = mode === 'dark' ? 'far fa-sun' : 'far fa-moon';
    } else {
      toggleBtn.textContent = mode === 'dark' ? '☀️' : '🌙';
    }
  }

  function setTheme(mode) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(`${mode}-mode`);
    body.setAttribute('data-theme', mode);
    syncToggle(mode);
    localStorage.setItem('theme', mode);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = body.classList.contains('dark-mode');
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
});
