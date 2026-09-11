const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const contacts = require('../data/contacts');

const seedContacts = async () => {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('MONGODB_URI and MONGODB_DB are required.');
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const collection = client.db(process.env.MONGODB_DB).collection('contacts');

    for (const contact of contacts) {
      await collection.updateOne(
        { email: contact.email },
        { $set: contact },
        { upsert: true }
      );
    }

    const count = await collection.countDocuments();
    console.log(`Seeded ${contacts.length} contacts into ${process.env.MONGODB_DB}.contacts. Total documents: ${count}`);
  } finally {
    await client.close();
  }
};

seedContacts().catch((error) => {
  console.error('Contact seeding failed:', error.message);
  process.exitCode = 1;
});
