const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const contactsRoutes = require('./routes/contactsRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(contactsRoutes);

app.get('/', (req, res) => {
  res.send('CSE 341 Contacts API is running.');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Professional API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  });
