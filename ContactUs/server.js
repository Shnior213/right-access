document.querySelector('.contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
        alert('אנא מלא את כל השדות הדרושים.');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('אנא הכנס כתובת אימייל תקינה.');
        return;
    }

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';

        const res = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message, phone }),
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.statusText}`);
        }

        alert('הטופס נשלח בהצלחה!');
        form.reset();
    } catch (error) {
        alert('שגיאה בשליחת הטופס: ' + error.message);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'שלח';
    }
});


/* const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require("dotenv").config();

const myemail = process.env.MY_EMAIL;
const mypass = process.env.PASS;

console.log(myemail); // אמור להציג את המייל


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// יצירת חיבור לשרת המייל
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myemail,
        pass: mypass,
    },
});

app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('אנא מלא את כל השדות הדרושים.');
    }

    

    const mailOptions = {
        from: email,
        to: myemail,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email.');
        }
        res.json('תודה! פנייתך נשלחה בהצלחה.');
    });
});
// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

 */