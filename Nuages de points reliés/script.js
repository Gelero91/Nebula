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

// Liste de points donnée (en JS maintenant)
let points = [
    [0.72051133, 2.13385354],
    [2.6843898 , 4.52123962],
    [3.80941133, 9.501295  ],
    [4.99882501, 9.3120602 ],
    [5.01120464, 9.09593528],
    [5.3849587 , 2.88145599],
    [6.79229996, 0.24899228],
    [8.03739036, 6.00548917],
    [9.77989512, 0.65936347],
    [0.99055186, 1.49098709],
    [4.28388326, 9.7415847 ],
    [7.02864362, 9.27468943],
    [7.75889535, 1.04132785],
    [8.04306871, 6.68726742],
    [8.65112528, 5.07696879],
    [8.4415226 , 0.17128133],
    [0.94916031, 1.46956515],
    [9.10362029, 5.51193459],
    [6.76957466, 6.35834172],
    [9.71167686, 3.90163595],
    [7.37763123, 4.74804308],
    ];

// Liste de liens donnée (en JS maintenant)
let links = [
    [[0.7205113335976154, 2.133853535799155], [0.9905518571788559, 1.4909870897448743]],
    [[3.809411331485384, 9.501295004136455], [4.283883259868437, 9.741584695108829]],
    [[5.011204636599379, 9.095935277196137], [7.028643617944478, 9.274689425813763]],
    [[6.792299961209405, 0.24899227550348013], [7.758895351849719, 1.0413278535588741]],
    [[8.037390361043755, 6.005489174641225], [8.043068710514051, 6.687267421635466]],
    [[8.037390361043755, 6.005489174641225], [8.65112528116088, 5.076968785652434]],
    [[9.779895119966026, 0.6593634690590511], [8.441522601265907, 0.171281328970947]],
    [[0.9905518571788559, 1.4909870897448743], [0.9491603089384526, 1.4695651542770507]],
    [[8.043068710514051, 6.687267421635466], [9.10362028675026, 5.511934587187512]],
    [[8.043068710514051, 6.687267421635466], [6.769574659450869, 6.3583417170298375]],
    [[8.65112528116088, 5.076968785652434], [9.711676857397089, 3.9016359512044794]],
    [[8.65112528116088, 5.076968785652434], [7.377631230097697, 4.748043081046804]]
];

// Appel de la fonction pour dessiner les axes
drawAxes();

// Dessiner tous les points sur le graphique
points.forEach(point => {
    drawPoint(point[0], point[1]);
});

// Dessiner toutes les lignes (liens) sur le graphique
links.forEach(link => {
    drawLine(link[0], link[1]);
});