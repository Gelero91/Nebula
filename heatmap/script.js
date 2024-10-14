// Variables globales pour permettre un contrôle avant l'initialisation
let canvas = document.getElementById('graphCanvas');
let ctx = canvas.getContext('2d');

// Paramètres personnalisables
let width = canvas.width;   // Largeur du canvas
let height = canvas.height; // Hauteur du canvas
let maxValue = 5;          // Valeur maximale sur les axes
let margin = 40;            // Marge pour laisser de la place aux labels
let axisColor = 'black';    // Couleur des axes
let pointRadius = 5;        // Rayon des points
let lineColor = 'blue';     // Couleur des lignes

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

// Fonction pour dessiner une ligne entre deux points
function drawLine(point1, point2, color = lineColor) {
    const { canvasX: x1, canvasY: y1 } = convertToCanvasCoords(point1[0], point1[1]);
    const { canvasX: x2, canvasY: y2 } = convertToCanvasCoords(point2[0], point2[1]);

    // Dessiner la ligne
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Liste de points (5x5 matrice)
let data = [
    [0.2211926, 0.00674248, 0.93590015, 0.02806881, 0.27550545],
    [0.38631146, 0.07948964, 0.19997984, 0.26654219, 0.52772628],
    [0.83865863, 0.13296314, 0.09757883, 0.12026107, 0.42906017],
    [0.19094553, 0.62245486, 0.00507112, 0.49565827, 0.66821959],
    [0.39311646, 0.5887751, 0.53867063, 0.84902915, 0.14642033]
];

// Fonction pour obtenir une couleur en fonction d'une valeur
function getColorForValue(value) {
    // Dégradé de couleur du bleu (faible) au rouge (élevé)
    let r = Math.floor(value * 255);  // Rouge
    let b = Math.floor((1 - value) * 255);  // Bleu
    return `rgb(${r}, 0, ${b})`;
}

// Fonction pour dessiner la heatmap
function drawHeatmap() {
    let rows = data.length;
    let cols = data[0].length;
    let cellWidth = (width - 2 * margin) / cols;
    let cellHeight = (height - 2 * margin) / rows;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Récupérer la valeur actuelle
            let value = data[row][col];

            // Obtenir la couleur correspondante
            let color = getColorForValue(value);

            // Dessiner la cellule de la heatmap
            ctx.fillStyle = color;
            ctx.fillRect(margin + col * cellWidth, margin + row * cellHeight, cellWidth, cellHeight);
        }
    }
}

// Dessiner les axes
drawAxes();

// Dessiner la heatmap
drawHeatmap();