const express = require('express');
const { getAllContacts, getContactById } = require('../controllers/contactsController');

const router = express.Router();

router.get('/contacts', (req, res, next) => {
  if (req.query.id) return getContactById(req, res, next);
  return getAllContacts(req, res, next);
});
router.get('/contacts/:id', getContactById);

module.exports = router;
