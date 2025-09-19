function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-tux-color-scheme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-tux-color-scheme', newTheme);
  html.setAttribute('data-theme', newTheme);
}

export default toggleTheme;
