function toggleMenu() {
    const menu = document.getElementById('accessibility-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function changeFontSize(factor) {
    document.body.style.fontSize =
        (parseFloat(window.getComputedStyle(document.body).fontSize) + factor) + 'px';
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}
