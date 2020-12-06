
import { getFreqList, getUserItemList } from "../db/db";
import { addItem, addItemToUserList, getAllItem, login, removeItemToUserList } from "../service/service";

var express = require('express');
var router = express.Router();

router.post('/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    res.status(400).send('missing') // todo error
  }
  const result = await login(username, password)
  res.status(200).send(result);
});
router.get('/all-list', async (req, res) => {
  const result = await getAllItem();
  res.status(200).send(result);
});
router.get('/freq-list', async (req, res) => {
  const result = await getFreqList();
  res.status(200).send(result);
});
router.get('/my-list', async (req, res) => {
  const userID = req.headers.userid
  const result = await getUserItemList(userID);
  res.status(200).send(result);
});
router.post('/add-item', async (req, res) => {
  const item = req.body.item
  const userID = req.body.userID
  const result = await addItemToUserList(item, userID);
  res.status(200).send(result);
});
router.post('/remove-item', async (req, res) => {
  const item = req.body.item
  const userID = req.body.userID
  const result = await removeItemToUserList(item, userID);
  res.status(200).send(result);
});
router.post('/add-itemname', async (req, res) => {
  const item = req.body.itemName
  const userID = req.body.userID
  const result = await addItem(item, userID);
  res.status(200).send(result);
});

module.exports = router