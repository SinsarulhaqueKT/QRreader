import express from "express";
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 1000;

// const db = mysql.createConnection({
//     host: "sql300.infinityfree.com",
//     user: "if0_35392251",
//     database: "if0_35392251_qrscanner",
//     password: "Sinsar@123",
// });
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "qrscanner",
    password: "password",
});



// const corsOptions = {
//     origin: 'http://sql12.freesqldatabase.com', // Change this to the correct frontend URL
//     optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('Helloo');
});

app.get('/history', (req, res) => {
    const q = 'SELECT * FROM qrurls';
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/insert', (req, res) => {
    const values = [req.body.urls];
    const q = 'INSERT INTO qrurls (urls) VALUES (?)';

    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json({ message: 'Inserted' });
        }
    });
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(port, () => {
    console.log(`Connected to backend on port ${port}`);
});
