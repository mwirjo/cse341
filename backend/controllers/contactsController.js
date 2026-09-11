const { findAllContacts, findContactById, ObjectId } = require('../models/contactsModel');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await findAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve contacts.' });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id || req.query.id;

    if (!contactId || !ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'A valid contact id is required.' });
    }

    const contact = await findContactById(contactId);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve contact.' });
  }
};

module.exports = { getAllContacts, getContactById };
