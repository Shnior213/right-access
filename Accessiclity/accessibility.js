// Accessibility JavaScript

// מאזין לטעינת הדף ומפעיל את תפריט הנגישות לאחר טעינה מלאה

document.addEventListener("DOMContentLoaded", () => {
    // יצירת כפתור הנגישות
    const toggleButton = document.createElement("button");
    toggleButton.id = "accessibility-toggle";
    toggleButton.textContent = "☰";
    document.body.appendChild(toggleButton);

    // יצירת תפריט הנגישות
    const menu = document.createElement("div");
    menu.id = "accessibility-menu";

    // הגדרת הפעולות בתפריט
    const actions = [
        { text: "ניגודיות גבוהה", action: toggleHighContrast },
        { text: "מצב עיוורי צבעים", action: toggleColorBlindMode },
        { text: "הגדלת טקסט", action: () => changeFontSize(1) },
        { text: "הקטנת טקסט", action: () => changeFontSize(-1) },
        { text: "הפחתת תנועה", action: toggleReduceMotion },
        { text: "הדגשת קישורים", action: highlightLinks },
        { text: "היפוך צבעים", action: invertColors }
    ];

    // יצירת כפתור לכל פעולה
    actions.forEach(({ text, action }) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", action);
        menu.appendChild(button);
    });

    // התפריט מוסתר כברירת מחדל
    menu.style.display = "none";
    document.body.appendChild(menu);

    // פתיחת וסגירת תפריט הנגישות בלחיצה על הכפתור
    toggleButton.addEventListener("click", () => {
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    // הפעלת נגישות למקלדת
    enableKeyboardNavigation();
});

// פונקציה שמאפשרת ניווט במקלדת
function enableKeyboardNavigation() {
    const focusableElements = Array.from(
        document.querySelectorAll("a, button, input, textarea, [tabindex]:not([tabindex='-1'])")
    );

    let currentIndex = 0;

    // מיקוד על האלמנט הראשון
    if (focusableElements.length > 0) {
        focusableElements[currentIndex].focus();
    }

    // ניווט עם מקשי חיצים
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

// פונקציה לשינוי גודל הטקסט
function changeFontSize(factor) {
    const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${currentSize + factor}px`;
}

// הפעלת מצב ניגודיות גבוהה
function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
}

// הפעלת מצב עיוורי צבעים
function toggleColorBlindMode() {
    document.body.classList.toggle("color-blind-mode");
}

// הפחתת אנימציות ותנועה בדף
function toggleReduceMotion() {
    document.body.classList.toggle("reduce-motion");
}

// הדגשת קישורים - שינוי סגנון ישירות על הקישור
function highlightLinks() {
    document.querySelectorAll("a").forEach((link) => {
        link.style.backgroundColor = link.style.backgroundColor === "yellow" ? "" : "yellow";
        link.style.color = link.style.color === "black" ? "" : "black";
        link.style.padding = link.style.padding === "4px 8px" ? "" : "4px 8px";
        link.style.borderRadius = link.style.borderRadius === "4px" ? "" : "4px";
        link.style.borderBottom = link.style.borderBottom === "2px dashed red" ? "" : "2px dashed red";
    });
}

// היפוך צבעים
function invertColors() {
    document.body.classList.toggle("invert-colors");
}
