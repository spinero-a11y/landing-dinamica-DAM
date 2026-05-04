// CAMBIO DE ESTILO DEL NAVBAR AL HACER SCROLL
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// PESTAÑAS DEL BUSCADOR (VUELOS / ALOJAMIENTOS)
const tabs = document.querySelectorAll('.search-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Quitar clase active de todas
    tabs.forEach(t => t.classList.remove('active'));
    // Poner clase active a la clickeada
    tab.classList.add('active');
  });
});

// EFECTO PARALLAX BÁSICO EN EL HERO
window.addEventListener('scroll', () => {
  const bg = document.getElementById('hero-bg');
  let offset = window.pageYOffset;
  // Mueve el fondo a la mitad de la velocidad del scroll
  bg.style.transform = `translateY(${offset * 0.5}px)`;
});

// SIMULACIÓN DE PAGO (Solo visual)
const payBtn = document.querySelector('.pay-btn');
if (payBtn) {
  payBtn.addEventListener('click', () => {
    payBtn.innerHTML = "Procesando...";
    setTimeout(() => {
      alert("¡Reserva confirmada! Recibirás un correo pronto.");
      window.location.href = 'index.html';
    }, 2000);
  });
}
document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha-vuelo');
    
    // 1. Obtener la fecha de hoy en formato YYYY-MM-DD
    const hoy = new Date();
    const hoyFormateado = hoy.toISOString().split('T')[0];
    
    // 2. Establecer el mínimo como "hoy" y el máximo como "fin de 2027"
    fechaInput.setAttribute('min', hoyFormateado);
    fechaInput.setAttribute('max', '2027-12-31');

    // 3. Lógica para diferenciar compra de reserva (opcional)
    fechaInput.addEventListener('change', function() {
        const fechaSeleccionada = new Date(this.value);
        const añoSeleccionado = fechaSeleccionada.getFullYear();
        const btnTexto = document.querySelector('.search-btn span');

        if (añoSeleccionado === 2027) {
            btnTexto.innerText = "Reservar para 2027";
            console.log("Modo Reserva activado");
        } else {
            btnTexto.innerText = "Buscar Vuelos";
        }
    });
});