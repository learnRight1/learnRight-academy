function openSlideMenu() {
  document.getElementById('side-menu').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
  document.getElementById('side-menu').style.transition = '0.3s'; // Add smooth transition
}

function closeSlideMenu() {
  document.getElementById('side-menu').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
  document.getElementById('side-menu').style.transition = '0.3s'; // Add smooth transition
}
