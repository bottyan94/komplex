
const config = require('config');
import * as path from 'path'
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const { Pool } = require('pg')

const app = express();

const port =  config.get('port');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));

const controller = require('./controller/Controller');
app.use('/api', controller);

app.use(express.static(__dirname + '/dist'));
app.use('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/', 'index.html'));
});
export const pool = new Pool(config.get('db'))
app.listen(port, () => {
  console.log(`Backend listening on ${port}! ;)`)
})