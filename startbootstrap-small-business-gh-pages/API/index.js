const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const token = process.env.API_TOKEN;
const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.post('/message', (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.prompt + ", repond moi comme si je voulais acheter des gâteaux et des pâtisseries marocaines dans ta patisserie marocaine et répond moi seulement et uniquement sur les gâteaux et patisseries marocaines",
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1024,
})
    response.then((data) => {
        res.send({message: data.data.choices[0].text})
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});