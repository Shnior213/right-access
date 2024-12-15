
document.querySelector('.contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const form = e.target;
    const formData = new FormData(form);

    if (!name || !email || !message) {
        alert('אנא מלא את כל השדות הדרושים.');
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('אנא הכנס כתובת אימייל תקינה.');
        return false;
    }
    try{
    const res = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, message: message, phone: phone })
    })

    console.log(await res.json())

    alert('הטופס נשלח בהצלחה!');
    form.reset(); // מנקה את כל השדות בטופס
    } catch (error) {
        alert('שגיאה בשליחת הטופס: ' + error.message);
    }
});
