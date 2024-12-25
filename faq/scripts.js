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

const questionsContainer = document.getElementById("questions-container");
const userQuestionInput = document.getElementById("user-question");
const submitQuestionBtn = document.getElementById("submit-question");
const adminPasswordInput = document.getElementById("admin-password");
const adminLoginBtn = document.getElementById("admin-login-btn");

const adminPassword = "1234"; // סיסמת אדמין
let isAdmin = false; // סטטוס התחברות של אדמין
let questions = []; // רשימת שאלות

// פונקציה להצגת כל השאלות
function renderQuestions() {
  questionsContainer.innerHTML = ""; // איפוס התצוגה
  questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = `<p>${question.text}</p>`;

        // הצגת תשובה (אם קיימת)
        if (question.answer) {
          const answerDiv = document.createElement("div");
          answerDiv.classList.add("answer");
          answerDiv.textContent = `תשובה: ${question.answer}`;
          questionDiv.appendChild(answerDiv);
      }

        // אם האדמין מחובר, נוסיף אפשרות לענות על השאלה
        if (isAdmin && !question.answer) {
          const answerInput = document.createElement("input");
          answerInput.type = "text";
          answerInput.placeholder = "כתוב תשובה כאן";
          const answerBtn = document.createElement("button");
          answerBtn.textContent = "הוסף תשובה";
          answerBtn.addEventListener("click", () => {
              const answerText = answerInput.value.trim();
              if (answerText === "") return alert("אנא כתוב תשובה.");
              question.answer = answerText; // שמירת התשובה
              saveQuestionsToLocalStorage(); // שמירת התשובה ב-localStorage
              renderQuestions(); // רענון התצוגה
          });

          questionDiv.appendChild(answerInput);
          questionDiv.appendChild(answerBtn);
      }

      questionsContainer.appendChild(questionDiv);
  });
}


// שמירת שאלות ב-localStorage
function saveQuestionsToLocalStorage() {
    localStorage.setItem("questions", JSON.stringify(questions));
}

// קריאת שאלות מ-localStorage
function loadQuestionsFromLocalStorage() {
  const savedQuestions = localStorage.getItem("questions");
  if (savedQuestions) {
      questions = JSON.parse(savedQuestions);
      renderQuestions(); // הצגת השאלות בדף
  }
}

// הוספת שאלה חדשה
submitQuestionBtn.addEventListener("click", () => {
    const questionText = userQuestionInput.value.trim();
    if (questionText === "") return alert("אנא כתוב שאלה.");

    questions.push({ text: questionText, answer: null });
    saveQuestionsToLocalStorage(); // שמירת השאלה החדשה
    renderQuestions();
    userQuestionInput.value = "";
});

// התחברות לאדמין
adminLoginBtn.addEventListener("click", () => {
    const enteredPassword = adminPasswordInput.value.trim();
    if (enteredPassword === adminPassword) {
        isAdmin = true;
        alert("התחברת כאדמין.");
        adminPasswordInput.value = "";
        renderQuestions(); // רענון התצוגה עם אפשרות להוסיף תשובות
    } else {
        alert("סיסמה שגויה.");
    }
});

// טעינת השאלות עם טעינת הדף
loadQuestionsFromLocalStorage();

console.log(localStorage.getItem("questions"));

