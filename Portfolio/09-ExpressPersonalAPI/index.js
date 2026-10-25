const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'html'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let names = [];
let tasks = [];

app.get('/', (req, res) => {
    res.render('index', { names, tasks, error: null });
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name && name.trim() !== '') {
        console.log(`Nombre registrado: ${name}`);
        names.push(name);
    }
    res.render('index', { names, tasks, error: null });
});

app.get('/greet/:index', (req, res, next) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < names.length) {
        res.render('wazzup', { name: names[index] });
    } else {
        const err = new Error('Error: El índice solicitado está fuera de rango.');
        next(err);
    }
});

app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    if (name) {
        names.push(name);
    }
    res.json(names);
});

app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task && task.trim() !== '') {
        tasks.push(task);
    }
    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json(tasks);
});

app.post('/task/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

app.post('/task/up/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index > 0 && index < tasks.length) {
        const temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
    }
    res.redirect('/');
});

app.post('/task/down/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length - 1) {
        const temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
    }
    res.redirect('/');
});

app.use((err, req, res, next) => {
    res.render('index', { names, tasks, error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});