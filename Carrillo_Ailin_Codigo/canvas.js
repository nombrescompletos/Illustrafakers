const canvas = document.getElementById("lienzo-generativo");
const ctx = canvas.getContext("2d");

// Imagen del personaje
const personaje = new Image();
personaje.src = "imagenes/arlequina.webp";

let imagenLista = false;
let paletaActual = 0;

// 2. PALETAS DE COLORES (ARREGLOS)

const paletas = [
    {
        nombre: "Circo clásico",
        colores: [
            "#F32936",
            "#2449C6",
            "#FFD928",
            "#FFF4E5",
            "#17152D"
        ],
        fondo1: "#17152D",
        fondo2: "#493F80"
    },
    {
        nombre: "Fantasía pastel",
        colores: [
            "#F5B8C9",
            "#A58BE8",
            "#83C8D5",
            "#FFE49A",
            "#FFF9F5"
        ],
        fondo1: "#493F80",
        fondo2: "#D58EBC"
    }
];

// 3. VARIABLES DE COMPOSICIÓN

const ancho = canvas.width;
const alto = canvas.height;

let elementos = [];

// 4. FUNCIÓN PARA EL FONDO DEGRADADO

function dibujarFondo() {

    const degradado = ctx.createLinearGradient(
        0, 0, ancho, alto
    );

    degradado.addColorStop(0, paletas[paletaActual].fondo1);
    degradado.addColorStop(1, paletas[paletaActual].fondo2);

    ctx.fillStyle = degradado;
    ctx.fillRect(0, 0, ancho, alto);

    // Círculos decorativos de fondo
    ctx.globalAlpha = 0.13;

    for (let i = 0; i < 8; i++) {

        const x = Math.random() * ancho;
        const y = Math.random() * alto;
        const radio = Math.random() * 65 + 15;

        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);

        ctx.fillStyle = paletas[paletaActual].colores[
            Math.floor(Math.random() * 5)
        ];

        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

// 5. FUNCIÓN PARA DIBUJAR CÍRCULOS

function dibujarCirculo(x, y, radio, color) {

    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);

    ctx.fillStyle = color;
    ctx.fill();
}

// 6. FUNCIÓN PARA DIBUJAR RECTÁNGULOS

function dibujarRectangulo(x, y, ancho, alto, color, rotacion = 0) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotacion);

    ctx.fillStyle = color;
    ctx.fillRect(-ancho / 2, -alto / 2, ancho, alto);

    ctx.restore();
}

// 7. FUNCIÓN PARA DIBUJAR TRIÁNGULOS

function dibujarTriangulo(x, y, tamano, color, rotacion = 0) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotacion);

    ctx.beginPath();
    ctx.moveTo(0, -tamano);
    ctx.lineTo(tamano, tamano);
    ctx.lineTo(-tamano, tamano);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
}

// 8. FUNCIÓN PARA DIBUJAR LÍNEAS

function dibujarLinea(x1, y1, x2, y2, color, grosor) {

    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;

    ctx.stroke();
}

// 9. FUNCIÓN PARA DIBUJAR ESTRELLAS

function dibujarEstrella(x, y, radio, color) {

    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();

    for (let i = 0; i < 10; i++) {

        const angulo = (Math.PI / 5) * i - Math.PI / 2;

        const distancia = i % 2 === 0
            ? radio
            : radio * 0.42;

        const px = Math.cos(angulo) * distancia;
        const py = Math.sin(angulo) * distancia;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
}

// 10. DECORACIONES GENERATIVAS

function dibujarElementos() {

    const colores = paletas[paletaActual].colores;

    elementos = [];

    // Bucle FOR: genera 18 elementos gráficos

    for (let i = 0; i < 18; i++) {

        const x = 520 + Math.random() * 440;
        const y = 40 + Math.random() * 550;
        const tamano = Math.random() * 24 + 12;

        const color = colores[
            Math.floor(Math.random() * colores.length)
        ];

        // Condicional para alternar las figuras

        if (i % 4 === 0) {

            dibujarCirculo(x, y, tamano, color);

            elementos.push("Círculo");

        } else if (i % 4 === 1) {

            dibujarRectangulo(
                x, y, tamano * 1.5, tamano * 1.5,
                color, Math.random()
            );

            elementos.push("Rectángulo");

        } else if (i % 4 === 2) {

            dibujarTriangulo(
                x, y, tamano, color, Math.random()
            );

            elementos.push("Triángulo");

        } else {

            dibujarEstrella(x, y, tamano, color);

            elementos.push("Estrella");
        }
    }

    // Líneas decorativas adicionales

    for (let i = 0; i < 5; i++) {

        const x = 520 + Math.random() * 420;
        const y = Math.random() * alto;

        dibujarLinea(
            x, y,
            x + 35, y + 35,
            colores[i % colores.length],
            4
        );
    }
}

// 11. FUNCIÓN PARA DIBUJAR EL PERSONAJE

function dibujarPersonaje() {

    if (imagenLista) {

        const espacioX = 25;
        const espacioY = 35;
        const espacioAncho = 475;
        const espacioAlto = 570;

        const escala = Math.min(
            espacioAncho / personaje.width,
            espacioAlto / personaje.height
        );

        const nuevoAncho = personaje.width * escala;
        const nuevoAlto = personaje.height * escala;

        const x = espacioX + (espacioAncho - nuevoAncho) / 2;
        const y = espacioY + (espacioAlto - nuevoAlto) / 2;

        ctx.drawImage(
            personaje,
            x, y,
            nuevoAncho, nuevoAlto
        );

    } else {

        // Figura provisional mientras carga la imagen

        dibujarCirculo(
            260, 320, 110,
            paletas[paletaActual].colores[2]
        );

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 22px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            "Cargando personaje...",
            260, 460
        );
    }
}

// 12. FUNCIÓN PARA DIBUJAR LOS TEXTOS

function dibujarTextos() {

    const colores = paletas[paletaActual].colores;

    ctx.textAlign = "center";

    // Título principal

    ctx.fillStyle = colores[2];
    ctx.font = "bold 48px Arial";

    ctx.fillText(
        "THE AMAZING",
        750, 250
    );

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 53px Arial";

    ctx.fillText(
        "DIGITAL",
        750, 310
    );

    ctx.fillStyle = colores[0];
    ctx.font = "bold 57px Arial";

    ctx.fillText(
        "CANVAS",
        750, 370
    );

    // Línea decorativa

    dibujarLinea(
        625, 405,
        875, 405,
        colores[2],
        5
    );

    // Subtítulo

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";

    ctx.fillText(
        "Un mundo de color y fantasía",
        750, 450
    );

    ctx.font = "bold 15px Arial";

    ctx.fillStyle = colores[2];

    ctx.fillText(
        "LUNA SPINEL · CREATIVE LAB",
        750, 505
    );

    // Firma inferior

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "13px Arial";

    ctx.fillText(
        "IMAGINA · CREA · EXPERIMENTA",
        750, 590
    );
}

// 13. FUNCIÓN PRINCIPAL DE COMPOSICIÓN

function generarComposicion() {

    ctx.clearRect(0, 0, ancho, alto);

    dibujarFondo();

    dibujarElementos();

    dibujarPersonaje();

    dibujarTextos();
}

// 14. CAMBIAR PALETA

function cambiarPaleta(numero) {

    paletaActual = numero;

    generarComposicion();
}

// 15. EVENTOS DE LOS BOTONES

document.getElementById("paleta-1")
    .addEventListener("click", function() {

        cambiarPaleta(0);

    });

document.getElementById("paleta-2")
    .addEventListener("click", function() {

        cambiarPaleta(1);

    });

document.getElementById("generar-composicion")
    .addEventListener("click", function() {

        generarComposicion();

    });

// 16. EXPORTAR COMPOSICIÓN COMO PNG

document.getElementById("guardar-png")
    .addEventListener("click", function() {

        const enlace = document.createElement("a");

        enlace.download = "Luna-Spinel-Canvas.png";

        enlace.href = canvas.toDataURL("image/png");

        enlace.click();

    });

// 17. CARGAR LA IMAGEN Y GENERAR AL INICIAR

personaje.onload = function() {

    imagenLista = true;

    generarComposicion();

};

personaje.onerror = function() {

    console.error(
        "No se pudo cargar la imagen del personaje."
    );

    generarComposicion();

};

// Composición inicial
generarComposicion();