import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Registramos un comando que se activará cuando el usuario invoque la extensión
    let disposable = vscode.commands.registerCommand('extension.showCatTip', () => {
        // Creamos un nuevo panel de webview en la columna activa del editor
        const panel = vscode.window.createWebviewPanel(
            'catTips', // Identificador del panel webview
            'Cat Tip', // Título del panel webview
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
		

        // Definimos un consejo de programación
        const catTip = 'Remember to use your fingers to type!'; // Aquí puedes poner tu consejo

        // Establecemos el contenido HTML para el webview
        panel.webview.html = getWebviewContent(imagePath, catTip);
    });

    // Añadimos el comando a la lista de suscripciones de disposición de la extensión
    context.subscriptions.push(disposable);
}

// Esta función retorna el contenido HTML que queremos mostrar en el webview
function getWebviewContent(imagePath: vscode.Uri, catTip: string) {
    // Usamos una literal de plantilla para retornar una cadena de texto que contiene HTML
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Tip</title>
    </head>
    <body>
        <img src="${imagePath}" style="max-width: 100%;">
        <h1>${catTip}</h1>
    </body>
    </html>`;
}

// Esta función se llama cuando tu extensión se desactiva
export function deactivate() {}
