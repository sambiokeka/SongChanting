async function loadComponent(id, file, jsFile = null) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    if (jsFile) {
    const script = document.createElement("script");
    script.src = jsFile;
    document.body.appendChild(script);
    }
}

// Carrega os componentes com seus respectivos JS
loadComponent("header", "src/components/header.html", "src/js/header.js");
loadComponent("sidebar", "src/components/sidebar.html", "src/js/sidebar.js");
loadComponent("footer", "src/components/footer.html");


// Lógica para alternar o modo escuro/claro, n ta funcionando ainda pq ele ta mudando a classe q ta no index.html mas ele tem q mudar a classe dos q tão em cada componente
const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');

function setInitialTheme() {
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
}
