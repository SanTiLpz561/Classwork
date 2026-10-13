const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' ,'index.html'));
});

app.post('/bmi', (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);

  if (!weight || !height) {
    return res.send("Please provide valid numbers for weight and height.");
  }

  const bmi = (weight / Math.pow(height, 2)) * 10000;

  res.send(`Your BMI is ${bmi.toFixed(2)}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});