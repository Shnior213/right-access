const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// יצירת חיבור לשרת המייל
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shnioramir123@gmail.com',
        pass: process.env.pass,
    },
});

app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('אנא מלא את כל השדות הדרושים.');
    }

    

    const mailOptions = {
        from: email,
        to: 'shnioramir123@gmail.com',
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

/*
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validate the data
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'אנא מלא את כל השדות הדרושים.'});
    }
    const query = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error saving your details.');
        }

    res.json({ message: 'תודה! נחזור אליך בהקדם.'});
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/