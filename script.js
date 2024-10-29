// script.js

import { eventos } from './eventos.js';

// Función para buscar eventos
function buscarEventos() {
    const query = document.getElementById("busqueda").value.toLowerCase();
    const resultadosDiv = document.getElementById("resultados");

    resultadosDiv.innerHTML = ""; // Limpiar los resultados anteriores

    // Filtrar eventos según la búsqueda
    const resultados = eventos.filter(evento => {
        return (
            evento.nombreConcierto.toLowerCase().includes(query) ||
            evento.artista.toLowerCase().includes(query) ||
            evento.fecha.includes(query) ||
            evento.genero.toLowerCase().includes(query)
        );
    });

    // Mostrar resultados
    if (resultados.length > 0) {
        resultados.forEach(evento => {
            const eventoDiv = document.createElement("div");
            eventoDiv.classList.add("resultado-item");
            eventoDiv.innerHTML = `
                <h3>${evento.nombreConcierto}</h3>
                <p><strong>Artista:</strong> ${evento.artista}</p>
                <p><strong>Fecha:</strong> ${evento.fecha}</p>
                <p><strong>Género:</strong> ${evento.genero}</p>
                <p><strong>Lugar:</strong> ${evento.lugar}</p>
            `;
            resultadosDiv.appendChild(eventoDiv);
        });
    } else {
        resultadosDiv.innerHTML = "<p>No se encontraron eventos.</p>";
    }
}

// Asigna la función buscarEventos al botón usando el ID
document.getElementById("buscar-btn").addEventListener("click", buscarEventos);




function obtenerEventosProximos() {
    const hoy = new Date();
    const proximosEventos = eventos.filter(evento => {
        const fechaEvento = new Date(evento.fecha);
        const diferenciaDias = (fechaEvento - hoy) / (1000 * 60 * 60 * 24);
        return diferenciaDias <= 7 && diferenciaDias > 0;
    });

    // Actualizar el número de notificaciones
    document.getElementById("notificaciones-numero").textContent = proximosEventos.length;

    // Mostrar la lista de notificaciones
    const notificacionesLista = document.getElementById("notificaciones-lista");
    notificacionesLista.innerHTML = ""; // Limpiar notificaciones anteriores
    proximosEventos.forEach(evento => {
        const notificacion = document.createElement("p");
        notificacion.textContent = `${evento.nombreConcierto} - ${evento.fecha} en ${evento.lugar}`;
        notificacionesLista.appendChild(notificacion);
    });
}

// Mostrar u ocultar la lista de notificaciones
function mostrarNotificaciones() {
    const notificacionesLista = document.getElementById("notificaciones-lista");
    notificacionesLista.classList.toggle("oculto");
}

// Ejecutar la función de obtener eventos próximos al cargar la página
obtenerEventosProximos();

// Asigna la función buscarEventos al botón usando el ID
document.getElementById("buscar-btn").addEventListener("click", buscarEventos);

document.getElementById('notificaciones-numero').addEventListener("click", mostrarNotificaciones);
