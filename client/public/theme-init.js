// Runs before the page paints. Kept external for the Express content security policy.
try {
  const theme = localStorage.getItem('ss-theme');
  document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
} catch {
  document.documentElement.dataset.theme = 'dark';
}
