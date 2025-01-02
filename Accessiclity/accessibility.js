
// Accessibility JavaScript

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.createElement("button");
    toggleButton.id = "accessibility-toggle";
    toggleButton.textContent = "☰";
    document.body.appendChild(toggleButton);

    const menu = document.createElement("div");
    menu.id = "accessibility-menu";

    const actions = [
        { text: "ניגודיות גבוהה", action: toggleHighContrast },
        { text: "מצב עיוורי צבעים", action: toggleColorBlindMode },
        { text: "הגדלת טקסט", action: () => changeFontSize(1) },
        { text: "הקטנת טקסט", action: () => changeFontSize(-1) },
        { text: "הפחתת תנועה", action: toggleReduceMotion },
        { text: "הדגשת קישורים", action: highlightLinks },
    ];

    actions.forEach(({ text, action }) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", action);
        menu.appendChild(button);
    });

    menu.style.display = "none";
    document.body.appendChild(menu);

    toggleButton.addEventListener("click", () => {
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    enableKeyboardNavigation(); // Enable keyboard navigation on page load
});

function enableKeyboardNavigation() {
    const focusableElements = Array.from(
        document.querySelectorAll("a, button, input, textarea, [tabindex]:not([tabindex='-1'])")
    );

    let currentIndex = 0;

    // Highlight the first focusable element
    if (focusableElements.length > 0) {
        focusableElements[currentIndex].focus();
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            currentIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[currentIndex].focus();
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            currentIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[currentIndex].focus();
        }
    });
}

function changeFontSize(factor) {
    const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${currentSize + factor}px`;
}

function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
}

function toggleColorBlindMode() {
    document.body.classList.toggle("color-blind-mode");
}

function toggleReduceMotion() {
    document.body.classList.toggle("reduce-motion");
}

function highlightLinks() {
    document.querySelectorAll("a").forEach((link) => {
        link.classList.toggle("highlight-links");
    });
}

/* document.addEventListener("DOMContentLoaded", () => {
    // יצירת כפתור הנגישות
    const toggleButton = document.createElement("button");
    toggleButton.id = "accessibility-toggle";
    toggleButton.textContent = "☰";
    document.body.appendChild(toggleButton);

    // יצירת תפריט הנגישות
    const menu = document.createElement("div");
    menu.id = "accessibility-menu";

    // פעולות נגישות
    const actions = [
        { text: "ניגודיות גבוהה", action: toggleHighContrast },
        { text: "מצב עיוורי צבעים", action: toggleColorBlindMode },
        { text: "הגדלת טקסט", action: () => changeFontSize(1) },
        { text: "הקטנת טקסט", action: () => changeFontSize(-1) },
        { text: "הפחתת תנועה", action: toggleReduceMotion },
        { text: "הדגשת קישורים", action: highlightLinks },
    ];

    // יצירת כפתורים בתפריט
    actions.forEach(({ text, action }) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", action);
        menu.appendChild(button);
    });

    document.body.appendChild(menu);

    // לחיצה על הכפתור מציגה את התפריט
    toggleButton.addEventListener("click", () => {
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });
});

// פונקציות נגישות
function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
}

function toggleColorBlindMode() {
    document.body.classList.toggle("color-blind-mode");
}

function changeFontSize(factor) {
    const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${currentSize + factor}px`;
}

function toggleReduceMotion() {
    document.body.classList.toggle("reduce-motion");
}

function highlightLinks() {
    document.querySelectorAll("a").forEach(link => {
        link.classList.toggle("highlight-links");
    });
}
 */
/*
//auseAllMedia() {
//    const mediaElements = document.querySelectorAll('video, audio');
//    mediaElements.forEach(media => media.pause());
//}

function changeLineHeight(factor) {
    document.body.style.lineHeight =
        (parseFloat(window.getComputedStyle(document.body).lineHeight) + factor) + 'em';
}

// New Accessibility Features
function invertColors() {
    document.body.classList.toggle('invert-colors');
}


function toggleMenu() {
    const menu = document.getElementById('accessibility-menu');
    menu.classList.toggle('hidden');
}

function changeFontSize(factor) {
    document.body.style.fontSize =
        (parseFloat(window.getComputedStyle(document.body).fontSize) + factor) + 'px';
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleColorBlindMode() {
    document.body.classList.toggle('color-blind-mode');
}

function peReduceMotion() {
    document.body.classList.toggle('reduce-motion');
}

function highlightLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => link.classList.toggle('highlight-links'));
}

function initializeAccessibility() {
    const container = document.createElement('div');
    container.id = 'accessibility-container';

    const toggleButton = document.createElement('button');
    toggleButton.id = 'accessibility-toggle';
    toggleButton.textContent = '☰';
    toggleButton.onclick = toggleMenu;

    const menu = document.createElement('div');
    menu.id = 'accessibility-menu';
    menu.className = 'hidden';

    const actions = [
        { text: 'ניגודיות גבוהה', action: toggleHighContrast },
        { text: 'הגדלת גופן', action: () => changeFontSize(1) },
        { text: 'הקטנת גופן', action: () => changeFontSize(-1) },
        { text: 'מצב לעיוורי צבעים', action: toggleColorBlindMode },
        //{ text: 'השהיית מדיה', action: pauseAllMedia },
        { text: 'הגדלת מרווח שורות', action: () => changeLineHeight(0.1) },
        { text: 'הקטנת מרווח שורות', action: () => changeLineHeight(-0.1) },
        { text: 'היפוך צבעים', action: invertColors },
        { text: 'הפחתת תנועה', action: toggleReduceMotion },
        { text: 'הדגשת קישורים', action: highlightLinks }
    ];

    actions.forEach(({ text, action }) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.onclick = action;
        menu.appendChild(button);
    });

    container.appendChild(toggleButton);
    container.appendChild(menu);
    document.body.appendChild(container);

    console.log('Accessibility features initialized.');
}

window.onload = initializeAccessibility; */
/*
// Accessibility JavaScript
function toggleMenu() {
    const menu = document.getElementById('accessibility-menu');
    menu.classList.toggle('hidden');
}

function changeFontSize(factor) {
    document.body.style.fontSize =
        (parseFloat(window.getComputedStyle(document.body).fontSize) + factor) + 'px';
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleColorBlindMode() {
    document.body.classList.toggle('color-blind-mode');
}

function pauseAllMedia() {
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach(media => media.pause());
}

function changeLineHeight(factor) {
    document.body.style.lineHeight =
        (parseFloat(window.getComputedStyle(document.body).lineHeight) + factor) + 'em';
}

function initializeAccessibility() {
    const container = document.createElement('div');
    container.id = 'accessibility-container';

    const toggleButton = document.createElement('button');
    toggleButton.id = 'accessibility-toggle';
    toggleButton.textContent = '☰';
    toggleButton.onclick = toggleMenu;

    const menu = document.createElement('div');
    menu.id = 'accessibility-menu';
    menu.className = 'hidden';

    const actions = [
        { text: 'ניגודיות גבוהה', action: toggleHighContrast },
        { text: 'הגדלת גופן', action: () => changeFontSize(1) },
        { text: 'הקטנת גופן', action: () => changeFontSize(-1) },
        { text: 'מצב לעיוורי צבעים', action: toggleColorBlindMode },
        { text: 'השהיית מדיה', action: pauseAllMedia },
        { text: 'הגדלת מרווח שורות', action: () => changeLineHeight(0.2) },
        { text: 'הקטנת מרווח שורות', action: () => changeLineHeight(-0.2) }
    ];

    actions.forEach(({ text, action }) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.onclick = action;
        menu.appendChild(button);
    });

    container.appendChild(toggleButton);
    container.appendChild(menu);
    document.body.appendChild(container);

    console.log('Accessibility features initialized.');
}

window.onload = initializeAccessibility;


/*
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
// Toggle Accessibility Menu
function toggleMenu() {
    const menu = document.getElementById('accessibility-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Change Font Size
function changeFontSize(factor) {
    document.body.style.fontSize =
        (parseFloat(window.getComputedStyle(document.body).fontSize) + factor) + 'px';
}

// Toggle High Contrast
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

// Toggle Color Blind Mode
function toggleColorBlindMode() {
    document.body.classList.toggle('color-blind-mode');
}

// Enable Keyboard Navigation
function enableKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Change Line Height
function changeLineHeight(factor) {
    document.body.style.lineHeight =
        (parseFloat(window.getComputedStyle(document.body).lineHeight) + factor) + 'em';
}

// Screen Reader Announcement
function announceForScreenReader(message) {
    const srElement = document.getElementById('sr-announcement');
    srElement.innerText = message;
    srElement.setAttribute('aria-live', 'assertive');
}

// Pause All Media
function pauseAllMedia() {
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach(media => media.pause());
}

// Initialize Accessibility Features
function initializeAccessibility() {
    enableKeyboardNavigation();
}

function toggleMenu() {
    const menu = document.getElementById('accessibility-menu');
    menu.classList.toggle('hidden');
}
*/
//more  onther page conntect 