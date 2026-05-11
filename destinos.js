const baseDeDatosVuelos = {
    // RUTA 1: BARCELONA A FRANKFURT (Corta - Europa)
    "Barcelona (BCN) -> Frankfurt (FRA)": [
        { aerolinea: "Lufthansa", salida: "06:15", llegada: "08:25", duracion: "2h 10m", precio: 215, escala: "Directo" },
        { aerolinea: "Vueling", salida: "10:40", llegada: "12:55", duracion: "2h 15m", precio: 82, escala: "Directo" },
        { aerolinea: "Lufthansa", salida: "16:20", llegada: "18:35", duracion: "2h 15m", precio: 156, escala: "Directo" },
        { aerolinea: "Iberia", salida: "19:05", llegada: "21:20", duracion: "2h 15m", precio: 120, escala: "Directo" }
    ],

    // RUTA 2: BARCELONA A TOKIO (Larga distancia - Asia)
    "Barcelona (BCN) -> Tokio (NRT)": [
        { aerolinea: "Japan Airlines", salida: "08:50", llegada: "09:10 (+1)", duracion: "13h 20m", precio: 1120, escala: "Directo" },
        { aerolinea: "Qatar Airways", salida: "15:25", llegada: "18:40 (+1)", duracion: "16h 15m", precio: 745, escala: "1 escala (Doha)" },
        { aerolinea: "Lufthansa", salida: "22:10", llegada: "23:55 (+1)", duracion: "14h 45m", precio: 910, escala: "1 escala (Munich)" }
    ],

    // RUTA 3: TOKIO A NUEVA YORK (Ultra larga distancia)
    "Tokio (NRT) -> Nueva York (JFK)": [
        { aerolinea: "Japan Airlines", salida: "11:05", llegada: "10:50", duracion: "12h 45m", precio: 1380, escala: "Directo" },
        { aerolinea: "Qatar Airways", salida: "23:30", llegada: "06:15 (+1)", duracion: "19h 45m", precio: 960, escala: "1 escala" }
    ],

    // RUTA 4: MADRID A SANTORINI (Vacacional - Verano)
    "Madrid (MAD) -> Santorini (JTR)": [
        { aerolinea: "Iberia", salida: "07:20", llegada: "11:55", duracion: "3h 35m", precio: 280, escala: "Directo" },
        { aerolinea: "Vueling", salida: "23:45", llegada: "04:15 (+1)", duracion: "3h 30m", precio: 145, escala: "Directo" }
    ]
};

let vuelosActuales = [];

function cargarPagina() {
    const params = new URLSearchParams(window.location.search);
    const origen = params.get('from') || "Barcelona (BCN)";
    const destino = params.get('to') || "Frankfurt (FRA)";
    const fecha = params.get('date') || "2024-08-15";

    document.getElementById('origen-display').innerText = origen;
    document.getElementById('destino-display').innerText = destino;
    document.getElementById('fecha-display').innerText = fecha;

    const llave = `${origen} -> ${destino}`;
    vuelosActuales = baseDeDatosVuelos[llave] || generarVuelosProvisional(origen, destino);
    render(vuelosActuales);
}

function render(vuelos) {
    const contenedor = document.getElementById('lista-vuelos');
    contenedor.innerHTML = vuelos.map(v => `
        <div class="vuelo-card">
            <div class="vuelo-detalles">
                <div>
                    <div class="vuelo-hora">${v.salida}</div>
                    <div class="vuelo-ciudad-codigo">ORIGEN</div>
                </div>
                <div class="vuelo-trayecto">
                    <div class="vuelo-duracion">${v.duracion}</div>
                    <div class="vuelo-linea"></div>
                    <div style="font-size: 0.7rem; margin-top: 5px; font-weight: bold; color: #27ae60;">${v.escala}</div>
                </div>
                <div>
                    <div class="vuelo-hora">${v.llegada}</div>
                    <div class="vuelo-ciudad-codigo">DESTINO</div>
                </div>
            </div>
            <div class="vuelo-pago">
                <div class="vuelo-aerolinea">${v.aerolinea}</div>
                <div class="vuelo-precio">${v.precio}€</div>
                <button class="vuelo-btn" onclick="confirmar('${v.aerolinea}', ${v.precio})">Elegir Vuelo</button>
            </div>
        </div>
    `).join('');
}

function aplicarFiltros() {
    const aero = document.getElementById('filtro-aerolinea').value;
    const precio = document.getElementById('filtro-precio').value;
    document.getElementById('precio-valor').innerText = `Hasta ${precio}€`;

    const filtrados = vuelosActuales.filter(v => 
        (aero === "" || v.aerolinea === aero) && v.precio <= precio
    );
    render(filtrados);
}

function generarVuelosProvisional(o, d) {
    // Si la ruta no está definida, genera 3 opciones con precios y horas lógicas
    return [
        { aerolinea: "Iberia", salida: "09:15", llegada: "12:40", duracion: "3h 25m", precio: 195, escala: "Directo" },
        { aerolinea: "Vueling", salida: "14:50", llegada: "18:20", duracion: "3h 30m", precio: 112, escala: "Directo" },
        { aerolinea: "Lufthansa", salida: "21:10", llegada: "00:35", duracion: "3h 25m", precio: 240, escala: "Directo" }
    ];
}

function confirmar(a, p) {
    alert(`Has seleccionado un vuelo de ${a} por ${p}€. ¡Buen viaje!`);
}

window.onload = cargarPagina;