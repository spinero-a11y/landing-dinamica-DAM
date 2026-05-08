# Documentación del Proyecto VeranoSummer

## Instrucciones de inicio/ejecución de vuestra web

Para ejecutar la aplicación web VeranoSummer, simplemente abra el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Safari, Edge). No requiere instalación de dependencias ni servidor backend, ya que es una aplicación frontend pura que utiliza únicamente HTML, CSS y JavaScript.

## Enumeración de al menos las 5 funcionalidades más importantes implementadas

1. **Sistema de búsqueda de vuelos y alojamientos** - Permite a los usuarios seleccionar origen, destino y fecha para buscar viajes
2. **Selector interactivo de aeropuertos** - Modal que permite elegir aeropuertos/ciudades de una lista alfabética
3. **Visualización de vuelos con filtros** - Muestra vuelos disponibles con opciones de filtrado por aerolínea, precio y ordenamiento
4. **Sistema de reserva y checkout** - Proceso de selección y reserva de vuelos con almacenamiento temporal
5. **Diseño responsivo y navegación** - Interfaz adaptativa que funciona en móviles y desktop con navegación intuitiva

## Funcionalidad 1: Sistema de búsqueda de vuelos y alojamientos

### 1.1. Descripción por escrito del comportamiento de la funcionalidad 1

Esta funcionalidad permite a los usuarios seleccionar entre modo "Vuelos" o "Alojamientos", elegir origen y destino mediante selectores interactivos, seleccionar fecha y realizar la búsqueda correspondiente. En modo vuelos redirige a la página de destinos, mientras que en modo alojamientos va directamente a la página de alojamientos.

### 1.2. Explicación del funcionamiento de la funcionalidad 1

La funcionalidad utiliza pestañas para alternar entre modos, campos de entrada con validación, y un botón de búsqueda que construye URLs con parámetros. Incluye validaciones para asegurar que se complete la información necesaria antes de proceder.

### 1.3. Fragmentos de código más relevantes de la funcionalidad 1

```javascript
// Función para cambiar entre modos vuelos/alojamientos
function cambiarModo(modo) {
  modoActual = modo;
  document.getElementById('tab-vuelos').classList.toggle('active', modo === 'vuelos');
  document.getElementById('tab-alojamientos').classList.toggle('active', modo === 'alojamientos');
  document.getElementById('field-origen').style.opacity = modo === 'alojamientos' ? "0.3" : "1";
}
```

Esta función cambia el estado visual de las pestañas y oculta el campo de origen cuando se selecciona modo alojamientos, ya que los alojamientos no requieren origen.

```javascript
// Función principal de búsqueda
function realizarBusqueda() {
  const ori = document.getElementById('origen-input').value;
  const des = document.getElementById('destino-input').value;
  const fec = document.getElementById('fecha-input').value;
  
  if (!des || !fec) return alert("Por favor, selecciona destino y fecha.");
  
  if (modoActual === 'vuelos') {
    if (!ori) return alert("Por favor, selecciona origen.");
    window.location.href = `destinos.html?from=${encodeURIComponent(ori)}&to=${encodeURIComponent(des)}&date=${fec}`;
  } else {
    window.location.href = `alojamientos.html?destino=${encodeURIComponent(des)}&fecha=${fec}`;
  }
}
```

Esta función valida los campos requeridos, muestra alertas si faltan datos, y redirige a las páginas correspondientes con los parámetros codificados en la URL. Se relaciona con `index.html` y afecta a `destinos.html` y `alojamientos.html`.

## Funcionalidad 2: Selector interactivo de aeropuertos

### 2.1. Descripción por escrito del comportamiento de la funcionalidad 2

Esta funcionalidad muestra un modal emergente cuando el usuario hace clic en los campos de origen o destino, presentando una lista alfabética de aeropuertos/ciudades disponibles. El usuario puede seleccionar una opción que se autocompleta en el campo correspondiente.

### 2.2. Explicación del funcionamiento de la funcionalidad 2

Utiliza un modal que se activa/desactiva con clics, filtra opciones según el modo actual (oculta origen en alojamientos), y permite selección mediante botones que actualizan los campos de entrada y cierran el modal.

### 2.3. Fragmentos de código más relevantes de la funcionalidad 2

```javascript
// Base de datos de destinos
const destinosDB = [
  { pais: "España", ciudad: "Madrid", code: "MAD" },
  { pais: "España", ciudad: "Barcelona", code: "BCN" },
  { pais: "Francia", ciudad: "París", code: "CDG" },
  // ... más destinos
];
```

Array de objetos que contiene la información de todos los aeropuertos disponibles, con país, ciudad y código IATA.

```javascript
function abrirSelector(tipo) {
  if (modoActual === 'alojamientos' && tipo === 'origen') return;
  inputActivo = tipo;
  const modal = document.getElementById('selector-modal');
  const lista = document.getElementById('lista-alfabetica');
  document.body.style.overflow = 'hidden';
  modal.classList.add('active');
  lista.innerHTML = "";
  destinosDB.sort((a,b) => a.ciudad.localeCompare(b.ciudad)).forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'vy-list-item';
    btn.onclick = (e) => { e.stopPropagation(); seleccionarDato(`${c.ciudad} (${c.code})`); };
    btn.innerHTML = `<div><span class="vy-label-primary">${c.ciudad}</span><br><small>${c.pais}</small></div><span style="font-family:'JetBrains Mono'; font-weight:bold;">${c.code}</span>`;
    lista.appendChild(btn);
  });
}
```

Esta función abre el modal, ordena alfabéticamente los destinos, crea botones dinámicamente para cada aeropuerto, y previene el scroll del body. Se relaciona con el HTML del modal en `index.html` y utiliza la base de datos `destinosDB`.

```javascript
function seleccionarDato(valor) {
  document.getElementById(`${inputActivo}-input`).value = valor;
  cerrarSelector();
}
```

Función simple que actualiza el campo activo con el valor seleccionado y cierra el modal.

## Funcionalidad 3: Visualización de vuelos con filtros

### 3.1. Descripción por escrito del comportamiento de la funcionalidad 3

Esta funcionalidad muestra una lista de vuelos disponibles para la ruta seleccionada, permitiendo filtrar por aerolínea, precio máximo y ordenar por diferentes criterios. Cada vuelo se presenta en una tarjeta con información detallada y opción de selección.

### 3.2. Explicación del funcionamiento de la funcionalidad 3

La página lee los parámetros URL para determinar origen y destino, carga vuelos de una base de datos organizada por rutas, aplica filtros dinámicamente, y renderiza las tarjetas de vuelos con información completa.

### 3.3. Fragmentos de código más relevantes de la funcionalidad 3

```javascript
// Base de datos de vuelos organizada por rutas
const vuelosDB = {
  'Madrid (MAD) -> Santorini (JTR)': [
    { aerolinea: 'Iberia', salida: '08:00', llegada: '12:30', duracion: '4h 30m', precio: 185, clase: 'Turista', escala: 'Directa' },
    // ... más vuelos
  ],
  // ... más rutas
};
```

Objeto que contiene arrays de vuelos organizados por clave "origen -> destino", permitiendo vuelos específicos para cada ruta.

```javascript
function obtenerParametrosURL() {
  const params = new URLSearchParams(window.location.search);
  origen = params.get('from') || 'Madrid';
  destino = params.get('to') || 'París (CDG)';
  fecha = params.get('date') || new Date().toISOString().split('T')[0];

  document.getElementById('origen-display').textContent = origen;
  document.getElementById('destino-display').textContent = destino;
  document.getElementById('fecha-display').textContent = new Date(fecha).toLocaleDateString('es-ES');
}
```

Esta función parsea los parámetros de la URL usando `URLSearchParams`, establece valores por defecto, y actualiza la interfaz con la información de la ruta. Se ejecuta al cargar la página y afecta a los elementos de display en `destinos.html`.

```javascript
function aplicarFiltros() {
  const aerolineaFiltro = document.getElementById('filtro-aerolinea').value;
  const precioFiltro = parseInt(document.getElementById('filtro-precio').value);
  const ordenFiltro = document.getElementById('filtro-orden').value;

  const rutaKey = `${origen} -> ${destino}`;
  vuelosFiltrados = [...vuelosDB[rutaKey]];

  // Aplicar filtros
  if (aerolineaFiltro) {
    vuelosFiltrados = vuelosFiltrados.filter(v => v.aerolinea === aerolineaFiltro);
  }
  vuelosFiltrados = vuelosFiltrados.filter(v => v.precio <= precioFiltro);

  // Aplicar orden
  switch (ordenFiltro) {
    case 'precio-asc':
      vuelosFiltrados.sort((a, b) => a.precio - b.precio);
      break;
    // ... más casos de ordenamiento
  }

  mostrarVuelos();
}
```

Función que aplica filtros secuencialmente usando `Array.filter()` y `Array.sort()`, modificando el array `vuelosFiltrados` y llamando a `mostrarVuelos()` para actualizar la interfaz. Se relaciona con los elementos de filtro en `destinos.html`.

## Funcionalidad 4: Sistema de reserva y checkout

### 4.1. Descripción por escrito del comportamiento de la funcionalidad 4

Esta funcionalidad permite a los usuarios seleccionar un vuelo específico, almacenar temporalmente la información de reserva, y proceder al proceso de checkout donde pueden completar sus datos personales y confirmar la reserva.

### 4.2. Explicación del funcionamiento de la funcionalidad 4

Cuando se selecciona un vuelo, la información se guarda en localStorage y se redirige a la página de reserva. El sistema mantiene el estado de la reserva entre páginas hasta que se complete o cancele.

### 4.3. Fragmentos de código más relevantes de la funcionalidad 4

```javascript
function seleccionarVuelo(aerolinea, precio) {
  // Guardar información del vuelo seleccionado
  localStorage.setItem('vueloSeleccionado', JSON.stringify({
    aerolinea: aerolinea,
    origen: origen,
    destino: destino,
    fecha: fecha,
    precio: precio
  }));
  
  // Redirigir a página de reserva
  window.location.href = `reservar.html?destino=${encodeURIComponent(destino)}&fecha=${fecha}&precio=${precio}&aerolinea=${encodeURIComponent(aerolinea)}`;
}
```

Esta función serializa la información del vuelo usando `JSON.stringify()`, la almacena en `localStorage` para persistencia entre páginas, y redirige a `reservar.html` con parámetros en la URL. Se ejecuta al hacer clic en "Seleccionar" en cualquier tarjeta de vuelo.

```javascript
// En reservar.html - recuperar datos del vuelo
const vueloSeleccionado = JSON.parse(localStorage.getItem('vueloSeleccionado') || '{}');
if (!vueloSeleccionado.aerolinea) {
  window.location.href = 'index.html'; // Redirigir si no hay vuelo seleccionado
}
```

Este código recupera los datos almacenados usando `JSON.parse()`, valida que exista información de vuelo, y redirige al inicio si no hay datos válidos. Se ejecuta al cargar `reservar.html`.

## Funcionalidad 5: Diseño responsivo y navegación

### 5.1. Descripción por escrito del comportamiento de la funcionalidad 5

Esta funcionalidad proporciona una interfaz que se adapta automáticamente al tamaño de pantalla del dispositivo, con navegación intuitiva mediante un menú superior que permite acceder a diferentes secciones del sitio.

### 5.2. Explicación del funcionamiento de la funcionalidad 5

Utiliza media queries CSS para cambiar layouts en diferentes tamaños de pantalla, y enlaces de navegación que conectan las diferentes páginas del sitio manteniendo la coherencia visual.

### 5.3. Fragmentos de código más relevantes de la funcionalidad 5

```css
/* Media queries para responsividad */
@media (max-width: 768px) {
  .selector-container {
    position: fixed;
    top: 10%;
    left: 5%;
    width: 90%;
    max-height: 80vh;
  }
  
  .vuelo-card {
    grid-template-columns: 1fr;
  }
  
  .vuelo-detalles {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

Media query que modifica el posicionamiento del modal selector y cambia el layout de las tarjetas de vuelo a columna única en pantallas pequeñas. Se aplica automáticamente basado en el ancho de viewport.

```html
<!-- Navegación principal presente en todas las páginas -->
<nav id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">VeranoSummer</a>
    <ul class="nav-links">
      <li><a href="#destinations">Destinos</a></li>
      <li><a href="#testimonios">Reseñas</a></li>
      <li><a href="checkout.html" class="nav-cta">Reservar ahora</a></li>
    </ul>
  </div>
</nav>
```

Barra de navegación HTML presente en todas las páginas (`index.html`, `destinos.html`, etc.), con enlaces a secciones usando anclas (#) y a páginas específicas. El logo enlaza siempre al inicio.

```css
/* Estilos responsivos para navegación */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Podría implementarse un menú hamburguesa */
  }
}
```

CSS que oculta los enlaces de navegación en móviles, preparado para una futura implementación de menú hamburguesa.

## Funcionalidades adicionales

### 8.1. Descripción por escrito del comportamiento de la funcionalidad adicional

Sistema de reseñas animadas que muestra testimonios de usuarios en un carrusel infinito horizontal, proporcionando confianza y credibilidad al sitio.

### 8.2. Explicación del funcionamiento de la funcionalidad adicional

Utiliza un contenedor con overflow oculto y animación CSS infinita que desplaza las reseñas horizontalmente, creando un efecto de marquesina continua.

### 8.3. Fragmentos de código más relevantes de la funcionalidad adicional

```css
.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.marquee-content {
  display: flex;
  gap: 50px;
  padding: 30px 0;
  width: max-content;
  animation: scrollInfinite 50s linear infinite;
}

@keyframes scrollInfinite {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

CSS que crea el efecto de marquesina infinita usando `animation` con `translateX`, y máscaras CSS para fundido suave en los bordes. Se relaciona con el elemento `.marquee-wrapper` en `index.html`.

```javascript
// Generación dinámica de reseñas
const reseñas = [
  { user: "@ana_travel", text: "Santorini fue un sueño gracias a sus recomendaciones." },
  // ... más reseñas
];

const marquee = document.getElementById('marquee-list');
[...reseñas, ...reseñas].forEach(r => {
  marquee.innerHTML += `
    <div class="review-card-fixed">
      <div class="rev-stars">★★★★★</div>
      <p class="rev-text">"${r.text}"</p>
      <span class="rev-user">${r.user}</span>
    </div>
  `;
});
```

JavaScript que duplica el array de reseñas para crear un bucle continuo sin saltos visuales, e inserta dinámicamente el HTML de cada reseña en el contenedor de marquesina.

## Funcionalidad Backend

### 9.1. Descripción por escrito del comportamiento de la funcionalidad backend

El proyecto utiliza un enfoque frontend puro sin servidor backend, almacenando datos temporalmente en localStorage del navegador y utilizando JavaScript para toda la lógica de negocio.

### 9.2. Explicación del funcionamiento de la funcionalidad backend

Los datos se almacenan en variables JavaScript y localStorage, con persistencia temporal limitada a la sesión del navegador. No hay base de datos externa ni API.

### 9.3. Fragmentos de código más relevantes de la funcionalidad backend

```javascript
// Almacenamiento temporal de reserva
localStorage.setItem('vueloSeleccionado', JSON.stringify({
  aerolinea: aerolinea,
  origen: origen,
  destino: destino,
  fecha: fecha,
  precio: precio
}));
```

Uso de `localStorage.setItem()` para persistir datos de reserva entre páginas, con serialización JSON para objetos complejos.

```javascript
// Recuperación de datos almacenados
const vueloSeleccionado = JSON.parse(localStorage.getItem('vueloSeleccionado') || '{}');
```

Recuperación de datos usando `localStorage.getItem()` y `JSON.parse()`, con valor por defecto vacío para evitar errores.

```javascript
// Base de datos en memoria
const destinosDB = [
  { pais: "España", ciudad: "Madrid", code: "MAD" },
  { pais: "España", ciudad: "Barcelona", code: "BCN" },
  // ... más datos
];
```

Arrays y objetos JavaScript que sirven como base de datos en memoria, sin persistencia externa.

## Responsividad

### 10.1. Descripción por escrito del comportamiento de la responsividad

La aplicación se adapta automáticamente a diferentes tamaños de pantalla, reorganizando layouts, cambiando tamaños de fuente, y modificando comportamientos de elementos interactivos para mantener usabilidad en dispositivos móviles y desktop.

### 10.2. Explicación del funcionamiento de la responsividad

Utiliza media queries CSS con breakpoints estratégicos (768px, 1024px) para aplicar estilos condicionales basados en el ancho de viewport, combinado con unidades relativas y flexbox/grid para layouts flexibles.

### 10.3. Fragmentos de código más relevantes de la responsividad

```css
/* Breakpoint principal para móviles */
@media (max-width: 768px) {
  .hero-content {
    padding: 40px 20px;
  }
  
  .search-fields {
    flex-direction: column;
    gap: 15px;
  }
  
  .destinations-grid {
    grid-template-columns: 1fr;
  }
  
  .vuelos-header h1 {
    font-size: 1.8rem;
  }
}
```

Media query que modifica el layout del hero, cambia la dirección de los campos de búsqueda a columna, convierte la cuadrícula de destinos a una columna, y reduce tamaños de fuente en móviles.

```css
/* Unidades relativas para escalabilidad */
.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
}

.dest-card {
  width: 100%;
  max-width: 400px;
}
```

Uso de `clamp()` para tamaños de fuente que escalan con el viewport, y `max-width` con porcentajes para contenedores flexibles.

```css
/* Flexbox responsivo */
.search-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 768px) {
  .search-fields {
    flex-direction: column;
  }
}
```

Flexbox que permite reorganización automática de elementos, cambiando de fila a columna en pantallas pequeñas mediante media queries.
