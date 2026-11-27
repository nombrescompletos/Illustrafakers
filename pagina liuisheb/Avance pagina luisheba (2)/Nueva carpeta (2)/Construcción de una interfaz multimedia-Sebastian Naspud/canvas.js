// CANVAS - TRIFUERZAS LUISHEBA

// Obtener los canvas
const canvas1 = document.getElementById("trifuerzaIzquierda");
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("trifuerzaDerecha");
const ctx2 = canvas2.getContext("2d");

// Función para dibujar un triángulo
function dibujarTriangulo(ctx, x, y) {

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + 45, y);
    ctx.lineTo(x + 22.5, y - 39);

    ctx.closePath();

    ctx.fillStyle = "#ffd000";
    ctx.strokeStyle = "#263C30";
    ctx.lineWidth = 2;

    ctx.fill();
    ctx.stroke();
}

// Función para dibujar la Trifuerza
function dibujarTrifuerza(ctx) {

    // Triángulo superior
    dibujarTriangulo(ctx, 50, 55);

    // Triángulo inferior izquierdo
    dibujarTriangulo(ctx, 27.5, 94);

    // Triángulo inferior derecho
    dibujarTriangulo(ctx, 72.5, 94);

}

// Dibujar las dos Trifuerzas
dibujarTrifuerza(ctx1);
dibujarTrifuerza(ctx2);

// KOLOG DE ZELDA

const canvasKolog = document.getElementById("kolog");
const ctxKolog = canvasKolog.getContext("2d");

// CUERPO
ctxKolog.beginPath();
ctxKolog.ellipse(85, 145, 22, 32, 0, 0, Math.PI * 2);
ctxKolog.fillStyle = "#80633F";
ctxKolog.fill();
ctxKolog.strokeStyle = "#493B27";
ctxKolog.lineWidth = 2;
ctxKolog.stroke();

// BRAZO IZQUIERDO
ctxKolog.beginPath();
ctxKolog.moveTo(70, 130);
ctxKolog.quadraticCurveTo(45, 135, 35, 160);
ctxKolog.strokeStyle = "#80633F";
ctxKolog.lineWidth = 10;
ctxKolog.lineCap = "round";
ctxKolog.stroke();

// BRAZO DERECHO
ctxKolog.beginPath();
ctxKolog.moveTo(100, 130);
ctxKolog.quadraticCurveTo(125, 112, 155, 112);
ctxKolog.stroke();

// MANO APOYADA
ctxKolog.beginPath();
ctxKolog.arc(160, 112, 9, 0, Math.PI * 2);
ctxKolog.fillStyle = "#D9C69A";
ctxKolog.fill();
ctxKolog.stroke();

// PIERNAS
ctxKolog.beginPath();
ctxKolog.moveTo(75, 168);
ctxKolog.lineTo(60, 190);
ctxKolog.moveTo(95, 168);
ctxKolog.lineTo(110, 190);
ctxKolog.stroke();

// PIES
ctxKolog.beginPath();
ctxKolog.ellipse(58, 192, 12, 7, 0, 0, Math.PI * 2);
ctxKolog.ellipse(112, 192, 12, 7, 0, 0, Math.PI * 2);
ctxKolog.fillStyle = "#526442";
ctxKolog.fill();

// MASCARA DE HOJA
ctxKolog.beginPath();
ctxKolog.moveTo(35, 80);
ctxKolog.quadraticCurveTo(10, 55, 38, 25);
ctxKolog.quadraticCurveTo(55, 5, 72, 25);
ctxKolog.quadraticCurveTo(100, 5, 115, 35);
ctxKolog.quadraticCurveTo(135, 65, 108, 95);
ctxKolog.quadraticCurveTo(75, 120, 45, 95);
ctxKolog.closePath();

let hoja = ctxKolog.createLinearGradient(30, 20, 120, 100);
hoja.addColorStop(0, "#B6D76C");
hoja.addColorStop(0.5, "#719B42");
hoja.addColorStop(1, "#365B32");

ctxKolog.fillStyle = hoja;
ctxKolog.fill();
ctxKolog.strokeStyle = "#344F2D";
ctxKolog.lineWidth = 3;
ctxKolog.stroke();

// NERVADURA DE LA HOJA
ctxKolog.beginPath();
ctxKolog.moveTo(73, 105);
ctxKolog.quadraticCurveTo(75, 65, 73, 20);
ctxKolog.strokeStyle = "#D0E59A";
ctxKolog.lineWidth = 2;
ctxKolog.stroke();

// CARA
ctxKolog.beginPath();
ctxKolog.ellipse(75, 77, 27, 25, 0, 0, Math.PI * 2);
ctxKolog.fillStyle = "#D7C69A";
ctxKolog.fill();
ctxKolog.strokeStyle = "#69583A";
ctxKolog.lineWidth = 2;
ctxKolog.stroke();

// OJOS
ctxKolog.beginPath();
ctxKolog.arc(64, 75, 4, 0, Math.PI * 2);
ctxKolog.arc(86, 75, 4, 0, Math.PI * 2);
ctxKolog.fillStyle = "#29251C";
ctxKolog.fill();

// BOCA
ctxKolog.beginPath();
ctxKolog.arc(75, 88, 5, 0, Math.PI);
ctxKolog.strokeStyle = "#665035";
ctxKolog.stroke();