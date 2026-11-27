
// Obtener el Canvas

let canvas = document.getElementById("decoracion");

let ctx = canvas.getContext("2d");


// Ajustar el tamaño del Canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Función para dibujar las ondas

function dibujarOndas() {

    // Color de las líneas

    ctx.strokeStyle = " #ff8c5c";

    ctx.lineWidth = 2;


    // Dibujar ondas en ambos lados

    for (let i = 0; i < 3; i++) {

        // Lado izquierdo

        ctx.beginPath();

        ctx.moveTo(50 + i * 12, 0);

        for (let y = 0; y < canvas.height; y += 100) {

            ctx.quadraticCurveTo(
                100 + i * 12,
                y + 50,
                50 + i * 12,
                y + 100
            );

        }

        ctx.stroke();


        // Lado derecho

        ctx.beginPath();

        ctx.moveTo(canvas.width - 50 - i * 12, 0);

        for (let y = 0; y < canvas.height; y += 100) {

            ctx.quadraticCurveTo(
                canvas.width - 100 - i * 12,
                y + 50,
                canvas.width - 50 - i * 12,
                y + 100
            );

        }

        ctx.stroke();

    }

}


// Ejecutar la función

dibujarOndas();


// Actualizar cuando cambia el tamaño de la ventana

window.addEventListener("resize", function() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    dibujarOndas();

});
