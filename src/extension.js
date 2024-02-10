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
    // Registramos un comando que se activará cuando el usuario invoque la extensión
    let disposable = vscode.commands.registerCommand('lowtiergod.try', () => {
        // Creamos un nuevo panel de webview en la columna activa del editor
        const panel = vscode.window.createWebviewPanel('catTips', // Identificador del panel webview
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
        // Definimos un consejo de programación
        const catTip = 'Remember to use your fingers to type!'; // Aquí puedes poner tu consejo
        // Establecemos el contenido HTML para el webview
        panel.webview.html = getWebviewContent(imagePath, catTip);
    });
    // Añadimos el comando a la lista de suscripciones de disposición de la extensión
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// Esta función retorna el contenido HTML que queremos mostrar en el webview
function getWebviewContent(imagePath, catTip) {
    // Usamos una literal de plantilla para retornar una cadena de texto que contiene HTML
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Low Tier God Tip</title>
    </head>
    <body>
        <img src="${imagePath}" style="max-width: 100%;">
        <h1>${catTip}</h1>
    </body>
    </html>`;
}
// Esta función se llama cuando tu extensión se desactiva
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map