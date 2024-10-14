// Variables globales pour permettre un contrôle avant l'initialisation
let canvas = document.getElementById('graphCanvas');
let ctx = canvas.getContext('2d');

// Paramètres personnalisables
let width = canvas.width;   // Largeur du canvas
let height = canvas.height; // Hauteur du canvas
let maxValue = 10;          // Valeur maximale sur les axes
let margin = 40;            // Marge pour laisser de la place aux labels
let axisColor = 'black';    // Couleur des axes
let pointRadius = 2;        // Rayon des points

// Fonction pour dessiner les axes
function drawAxes() {
    // Effacer le canvas avant de redessiner
    ctx.clearRect(0, 0, width, height);

    // Axe des abscisses (X) en bas
    ctx.beginPath();
    ctx.moveTo(margin, height - margin); // Position de départ (bas à gauche)
    ctx.lineTo(width - margin, height - margin); // Position de fin (bas à droite)
    ctx.strokeStyle = axisColor;
    ctx.stroke();

    // Axe des ordonnées (Y) à gauche
    ctx.beginPath();
    ctx.moveTo(margin, height - margin); // Position de départ (bas à gauche)
    ctx.lineTo(margin, margin); // Jusqu'en haut (gauche)
    ctx.strokeStyle = axisColor;
    ctx.stroke();

    // Dessiner les graduations sur l'axe des abscisses (X)
    for (let i = 0; i <= maxValue; i++) {
        const x = margin + i * ((width - 2 * margin) / maxValue);
        ctx.beginPath();
        ctx.moveTo(x, height - margin); // Graduation sur l'axe X
        ctx.lineTo(x, height - margin + 5); // Petite ligne vers le bas
        ctx.stroke();

        // Label de graduation pour l'axe X
        ctx.fillText(i, x - 3, height - margin + 15);
    }

    // Dessiner les graduations sur l'axe des ordonnées (Y)
    for (let i = 0; i <= maxValue; i++) {
        const y = height - margin - i * ((height - 2 * margin) / maxValue);
        ctx.beginPath();
        ctx.moveTo(margin, y); // Graduation sur l'axe Y
        ctx.lineTo(margin - 5, y); // Petite ligne vers la gauche
        ctx.stroke();

        // Label de graduation pour l'axe Y
        ctx.fillText(i, margin - 20, y + 3);
    }
}

// Fonction pour convertir les coordonnées du graphique en coordonnées du canvas
function convertToCanvasCoords(x, y) {
    // Convertir X de l'échelle [0, maxValue] à [margin, width - margin]
    const canvasX = margin + (x / maxValue) * (width - 2 * margin);
    // Convertir Y de l'échelle [0, maxValue] à [height - margin, margin]
    const canvasY = height - margin - (y / maxValue) * (height - 2 * margin);
    return { canvasX, canvasY };
}

// Fonction pour dessiner un point sur le graphique
function drawPoint(x, y, color = 'red') {
    const { canvasX, canvasY } = convertToCanvasCoords(x, y);

    // Dessiner le point
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, pointRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Liste de points donnée (en JS maintenant)
let points = [
    [0.06230255, 9.56652968],
    [0.08986098, 7.33380168],
    [1.63842241, 6.00742721],
    [1.97685075, 8.66289299],
    [2.52982362, 4.36146647],
    [3.86571283, 4.0844386],
    [4.34791532, 9.48977307],
    [5.97333944, 1.67972184],
    [7.79382922, 7.86305986],
    [8.62993236, 1.73165421],
    [9.76274455, 0.44160058],
    [9.83400677, 0.74948587],
    [1.52313833, 9.98860108],
    [0.49810662, 7.66431505],
    [1.53535974, 7.52380514],
    [5.95358369, 4.99927956],
    [3.20411675, 9.99969285],
    [8.32696839, 2.9336568],
    [6.28131845, 4.30438807],
    [6.32691728, 5.68497501],
    [7.26156734, 4.58785313],
    [5.98081541, 5.15677894]
];

// Appel de la fonction pour dessiner les axes
drawAxes();

// Dessiner tous les points sur le graphique
points.forEach(point => {
    drawPoint(point[0], point[1]);
});