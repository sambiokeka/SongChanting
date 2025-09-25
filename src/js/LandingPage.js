async function loadComponent(id, file, jsFile = null) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    if (jsFile) {
        const oldScript = document.querySelector(`script[src="${jsFile}"]`);
        if (oldScript) oldScript.remove();
        
        const script = document.createElement("script");
        script.src = jsFile;
        document.body.appendChild(script);
    }
}

// Função que carrega tudo que a Landing Page precisa
async function initializelandingPage() {
    await Promise.all([
        loadComponent("header", "src/components/header.html", "src/js/header.js"),
        loadComponent("sidebar", "src/components/sidebar.html", "src/js/sidebar.js"),
        loadComponent("footer", "src/components/footer.html")
    ]);

}

// Inicia o carregamento da página
initializelandingPage();