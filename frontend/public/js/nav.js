document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const href = link.getAttribute('href');
      window.location.href = href;
    });
  });
});
