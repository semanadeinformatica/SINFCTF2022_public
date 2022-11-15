const express = require('express');

const { parseTodoItem } = require("../utils/index");
const uuid = require("uuid");

const router = express.Router();

const isObject = obj => obj && obj.constructor && obj.constructor === Object;

function merge(a, b) {
  for (var attr in b) {
    if (isObject(a[attr]) && isObject(b[attr])) {
      merge(a[attr], b[attr]);
    } else {
      a[attr] = b[attr];
    }
  }
  return a
}

function clone(a) {
  return merge({}, a);
}

const store = {
  items: [
    {
      text: "Buy eggs, milk, flour, sugar",
      checked: false,
      id: uuid.v4(),
    },
    {
      text: "Open $ORG_NAME shop",
      checked: false,
      id: uuid.v4(),
    },
    {
      text: "Rename the shop to $APP_NAME",
      checked: false,
      id: uuid.v4(),
    },
  ]
};

router.get('/items',
  (req, res) =>
    res
      .status(200)
      .json({
        ...store,
        items: store.items.map((item) => (
          req.query.noParseItems
            ? (x) => (x)
            : parseTodoItem)
          (item))
      }));
router.post('/items', (req, res) => {

  copyBody = clone(req.body);

  store.items = copyBody.items;

  return res.status(200).json(store.items);
});

router.post('/item', (req, res) => {

  const { text: itemText, checked = false } = req.body;

  if (!itemText)
    return res.status(422).json({ ok: false, message: 'Request body must have "text" field' });

  const newItem = {
    text: itemText,
    checked,
    id: uuid.v4(),
  };

  store.items.push(newItem);

  return res.status(200).json({ ok: true, message: '', item: parseTodoItem(newItem) });
});
router.patch('/item/:id', (req, res) => {

  const { id } = req.params;
  const { checked } = req.body;

  let oldItem;
  for (const item of store.items)
    if (item.id === id)
      oldItem = item;

  const newItem = { ...oldItem, checked };

  store.items = [...store.items.filter((item) => item.id !== id), newItem];

  return res.status(200).json({ ok: true, message: '', item: newItem });
})

module.exports = router;
