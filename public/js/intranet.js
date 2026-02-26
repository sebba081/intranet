document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapseBtn');
  const themeToggle = document.getElementById('themeToggle');
  const toast = document.getElementById('toast');

  const savedTheme = localStorage.getItem('intranet-theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('intranet-theme', next);
    });
  }

  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        sidebar.classList.toggle('open');
      } else {
        sidebar.classList.toggle('collapsed');
      }
    });
  }

  document.querySelectorAll('[data-table-root]').forEach((root) => {
    const table = root.querySelector('.data-table');
    if (!table) return;

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const pageLabel = root.querySelector('.table-page');
    const prevBtn = root.querySelector('.table-prev');
    const nextBtn = root.querySelector('.table-next');
    const filterInput = root.querySelector('.table-filter');
    const refreshBtn = root.querySelector('.table-refresh');
    const skeleton = root.querySelector('.table-skeleton');
    const empty = root.querySelector('.table-empty');
    const pageSize = 6;
    let page = 1;
    let filteredRows = [...rows];

    const paint = () => {
      const pages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
      if (page > pages) page = pages;
      const start = (page - 1) * pageSize;
      const visibleRows = new Set(filteredRows.slice(start, start + pageSize));
      rows.forEach((r) => { r.style.display = visibleRows.has(r) ? '' : 'none'; });
      if (pageLabel) pageLabel.textContent = `${page}/${pages}`;
      if (empty) empty.classList.toggle('d-none', filteredRows.length > 0);
    };

    const refilter = () => {
      const q = String(filterInput?.value || '').toLowerCase().trim();
      filteredRows = rows.filter((r) => r.textContent.toLowerCase().includes(q));
      page = 1;
      paint();
    };

    prevBtn?.addEventListener('click', () => { page = Math.max(1, page - 1); paint(); });
    nextBtn?.addEventListener('click', () => { page += 1; paint(); });
    filterInput?.addEventListener('input', refilter);
    refreshBtn?.addEventListener('click', () => {
      skeleton?.classList.remove('d-none');
      table.classList.add('d-none');
      setTimeout(() => {
        skeleton?.classList.add('d-none');
        table.classList.remove('d-none');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 1300);
        }
      }, 700);
    });

    paint();
  });
});
