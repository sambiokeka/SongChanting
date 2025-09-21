// Controle do menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMenuButton = document.getElementById('close-menu-button');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileMenu = document.getElementById('mobile-menu');

function openMobileMenu() {
    mobileMenu.classList.remove('menu-closed');
    mobileMenu.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('menu-open');
    mobileMenu.classList.add('menu-closed');
    document.body.style.overflow = 'auto';
}

mobileMenuButton.addEventListener('click', openMobileMenu);
closeMenuButton.addEventListener('click', closeMobileMenu);
mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

// Fechar menu com a tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
});