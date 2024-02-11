"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('lowtiergod.try', () => {
        const panel = vscode.window.createWebviewPanel('lowTierGodTip', // Identificador del panel webview
        'Low Tier God Tip', // Título del panel webview
        vscode.ViewColumn.One, // Muestra el panel en la columna actual
        {
            // Habilitamos los scripts en el webview
            enableScripts: true,
            // Restringimos el webview a solo cargar contenido de la carpeta 'images' de nuestra extensión
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'images'))]
        });
        // Obtenemos el path seguro para la imagen dentro del webview
        const imagePath = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'images', 'LowTierGod.jpg')));
        // Obtenemos el path seguro para el sonido dentro del webview
        const soundPath = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'images', 'thunder.mp3')));
        // Definimos un consejo de programación, puedes personalizar esto a tu gusto
        const catTip = 'Remember to kill yourself!';
        // Establecemos el contenido HTML para el webview
        panel.webview.html = getWebviewContent(imagePath, soundPath, catTip);
    });
    // Establecer un intervalo para ejecutar automáticamente el comando cada 10 minutos
    const interval = setInterval(() => {
        vscode.commands.executeCommand('lowtiergod.try');
    }, 6000); // 600000 ms equivalen a 10 minutos
    // Asegurarse de limpiar el intervalo cuando la extensión se desactive
    context.subscriptions.push({
        dispose: () => clearInterval(interval)
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getWebviewContent(imagePath, soundPath, catTip) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Low Tier God Tip</title>
    </head>
    <body>
        <img src="${imagePath}" style="max-width: 100%; cursor: pointer;" id="playSoundImage">
        <h1>${catTip}</h1>
        <audio id="sound" src="${soundPath}"></audio>
        <script>
            // Añade un manejador de eventos de clic a la imagen
            document.getElementById('playSoundImage').addEventListener('click', function() {
                var sound = document.getElementById('sound');
                // Intenta reproducir el sonido
                sound.play().catch(error => console.error("Error al intentar reproducir el sonido:", error));
            });
        </script>
    </body>
    </html>`;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map