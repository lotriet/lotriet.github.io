function exportToPDF() {
  // Use browser's built-in print functionality
  // Users can choose "Save as PDF" in the print dialog
  window.print();
}

// Collapsible job sections
document.addEventListener('DOMContentLoaded', () => {
  // Collapsible .job blocks (index.html and sa-resume.html)
  const jobToggles = document.querySelectorAll('.job .job-toggle');
  jobToggles.forEach(btn => {
    const job = btn.closest('.job');
    if (!job) return;
    job.classList.add('collapsible');
    job.dataset.initiallyClosed = 'true';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Show details';

    // Ensure initial closed state visually
    job.classList.remove('open');

    btn.addEventListener('click', () => {
      const isOpen = job.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.textContent = isOpen ? 'Hide details' : 'Show details';
    });
  });

  // Collapsible items in resume.html (list layout)
  const resToggles = document.querySelectorAll('.res-toggle');
  resToggles.forEach(btn => {
    // Assume the UL immediately follows the button
    const detailsList = btn.nextElementSibling;
    if (!detailsList || detailsList.tagName !== 'UL') return;
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Show details';
    // Start hidden
    detailsList.style.display = 'none';

    btn.addEventListener('click', () => {
      const isHidden = detailsList.style.display === 'none';
      detailsList.style.display = isHidden ? '' : 'none';
      btn.setAttribute('aria-expanded', String(isHidden));
      btn.textContent = isHidden ? 'Hide details' : 'Show details';
    });
  });

  // Ensure details are expanded for printing
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.job.collapsible').forEach(job => {
      job.classList.add('open');
    });
    document.querySelectorAll('.res-toggle').forEach(btn => {
      const ul = btn.nextElementSibling;
      if (ul && ul.tagName === 'UL') ul.style.display = '';
    });
  });

  window.addEventListener('afterprint', () => {
    document.querySelectorAll('.job.collapsible').forEach(job => {
      if (job.dataset.initiallyClosed === 'true') {
        job.classList.remove('open');
      }
    });
    document.querySelectorAll('.job .job-toggle').forEach(btn => {
      const job = btn.closest('.job');
      const isOpen = job && job.classList.contains('open');
      btn.setAttribute('aria-expanded', String(!!isOpen));
      btn.textContent = isOpen ? 'Hide details' : 'Show details';
    });
    document.querySelectorAll('.res-toggle').forEach(btn => {
      const ul = btn.nextElementSibling;
      if (ul && ul.tagName === 'UL') {
        // Restore collapsed state
        ul.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Show details';
      }
    });
  });
});
