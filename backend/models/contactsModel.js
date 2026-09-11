const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

const contactsCollection = () => getDB().collection('contacts');

const findAllContacts = () => contactsCollection().find().toArray();

const findContactById = (id) => contactsCollection().findOne({
  _id: new ObjectId(id)
});

module.exports = { findAllContacts, findContactById, ObjectId };
