const express = require('express');
const { decorateApp } = require('@awaitjs/express');
const bus = require('servicebus').bus();
const app = decorateApp(express());
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const { validateInventoryRequest } = require('./validateInventoryRequest')

app.use(bodyParser.json());

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.postAsync('/inventory', async (req, res, next) => {
  const validationResult = validateInventoryRequest(req.body);
  if(!validationResult[0])
    res.status(400).json({ error: validationResult[1] });

  const UUID = uuidv4();
  bus.publish('inventory.create', { id: UUID , name: req.body.name, description: req.body.description});
  res.status(200).json({ data: {} });
});

app.listen(3000);