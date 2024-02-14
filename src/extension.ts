import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('lowtiergod.try', () => {
        const panel = vscode.window.createWebviewPanel(
            'lowTierGodTip', // Identificador del panel webview
            'Low Tier God Tip', // Título del panel webview
            vscode.ViewColumn.One, // Muestra el panel en la columna actual
            {
                // Habilitamos los scripts en el webview
                enableScripts: true,
                // Restringimos el webview a solo cargar contenido de la carpeta 'images' de nuestra extensión
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'images'))]
            }
        );

        // Obtenemos el path seguro para la imagen dentro del webview
        const imagePath = panel.webview.asWebviewUri(vscode.Uri.file(
            path.join(context.extensionPath, 'images', 'LowTierGod.jpg')
        ));

        // Obtenemos el path seguro para el sonido dentro del webview
        const soundPath = panel.webview.asWebviewUri(vscode.Uri.file(
            path.join(context.extensionPath, 'images', 'thunder.mp3')
        ));

        // Definimos un consejo de programación, puedes personalizar esto a tu gusto
        const catTip = 'Remember to kill yourself!';

        // Establecemos el contenido HTML para el webview
        panel.webview.html = getWebviewContent(imagePath, soundPath, catTip);
    });
    // Establecer un intervalo para ejecutar automáticamente el comando cada 1 hora
    const interval = setInterval(() => {
        vscode.commands.executeCommand('lowtiergod.try');
    }, 3600000); // 3600000 ms equivalen a 1 hora

    // Asegurarse de limpiar el intervalo cuando la extensión se desactive
    context.subscriptions.push({
        dispose: () => clearInterval(interval)
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(imagePath: vscode.Uri, soundPath: vscode.Uri, catTip: string) {
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

export function deactivate() {}
