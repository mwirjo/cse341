# CSE 341: Web Services

## W01 Project: Contacts Part 1

## Project Objective

Build a Node.js and Express REST API that stores and retrieves contacts from MongoDB. This project is an API-only application; no frontend is required. The API is designed so that any future frontend can use it.

The Week 01 scope includes:

- initializing the Node.js project
- connecting securely to MongoDB Atlas
- importing contact data
- retrieving all contacts
- retrieving one contact by its MongoDB ID
- testing the API locally with a REST client

The backend architecture follows the same layered MVC pattern used in a separate working project, but this project is limited to the Contacts requirements.

## Contact Data

Each contact document contains:

- `firstName`
- `lastName`
- `email`
- `favoriteColor`
- `birthday`

The `contacts` collection contains at least three documents in the `cse341` database.

## Scope of Work

### Week 01 Included Work

1. Initialize the npm Node.js project.
2. Configure Express and start the server on port `8080`.
3. Connect the server to MongoDB Atlas.
4. Store the MongoDB connection string in `backend/.env`.
5. Protect secrets and `node_modules` with `.gitignore`.
6. Create the `contacts` collection.
7. Import at least three contact documents.
8. Implement a GET endpoint that returns all contacts.
9. Implement a GET endpoint that returns one contact by ID.
10. Test the endpoints with a REST client.

### Future Week 02 Work

- POST contacts
- PUT contacts
- DELETE contacts
- Swagger API documentation

### Deployment Work

The API must be tested locally first. Publishing the API to Render is part of the project submission and should be completed after the local endpoints work. Render environment variables must contain the same configuration names as the local `.env` file.

## Implementation Report

### 1. Set Up the Project and Database

The project was initialized as an npm Node.js application. Express, CORS, dotenv, and the MongoDB driver were installed. The backend was organized into separate configuration, model, controller, route, and server files.

The MongoDB connection is loaded from `backend/.env` using `MONGODB_URI` and `MONGODB_DB`. The selected database is `cse341`. The server connects to MongoDB before listening on the configured port.

### 2. Import Data into the Database

Three contact records were defined in `backend/data/contacts.js`. A repeatable import script was added at `backend/scripts/seedContacts.js` and exposed through:

```powershell
npm run seed
```

The script connects to MongoDB, writes the records into the `contacts` collection, and uses each email address as the upsert key. This prevents duplicate records when the command is run again.

The import completed successfully with:

```text
Seeded 3 contacts into cse341.contacts. Total documents: 3
```

### 3. Complete the GET API Routes

The following routes were implemented and tested:

```text
GET /contacts
GET /contacts/:id
GET /contacts?id=<id>
```

The model performs the MongoDB queries, the controller validates IDs and creates responses, and the route file maps URLs to controller functions. Local verification confirmed that the get-all route returned three contacts, both single-contact forms returned the matching contact, invalid IDs returned `400`, and unknown IDs returned `404`.

### 4. Deploy the App to Render

The application was deployed to Render as a Node web service. The Render service uses:

```text
Build Command: npm install
Start Command: npm start
Root Directory: blank
```

The Render environment uses `MONGODB_URI` and `MONGODB_DB=cse341` as config variables. Render supplies the runtime `PORT` value, which the server reads from `process.env.PORT`.

The published API is:

```text
https://cse341-6gdb.onrender.com
```

The deployed health check, get-all route, URL-parameter route, and query-parameter route were verified successfully.

## Problems Encountered and Resolutions

- **Port conflict (`EADDRINUSE`):** The API was started more than once, so two Node processes attempted to use port `8080`. The existing `node backend/server.js` process was identified and stopped. The server was then started only once.
- **PowerShell MongoDB import error:** PowerShell expanded MongoDB operators such as `$set` and `$in` while running an inline Node command. The import was moved into the reusable `seedContacts.js` script, which completed successfully.
- **Incorrect initial SOW scope:** The SOW initially described the professional-profile activity and later contained duplicated YW content. It was replaced with a Contacts Part 1 SOW matching this assignment.
- **Incomplete MVC separation:** The controller initially accessed the MongoDB collection directly. A dedicated `models/contactsModel.js` file was added, and the controller now handles validation and responses separately from database queries.
- **Placeholder MongoDB profile data:** The earlier profile project used placeholder data and was removed from the Contacts backend. The Contacts API now reads only from the MongoDB `contacts` collection.

No credentials are included in this report. The real MongoDB URI remains in the ignored local `backend/.env` file and must be entered as a Render config variable rather than committed to GitHub.

## API Endpoints

### Health Check

```text
GET /
```

Expected response:

```text
CSE 341 Contacts API is running.
```

### Get All Contacts

```text
GET http://localhost:8080/contacts
```

Expected result: an array containing every document in the MongoDB `contacts` collection.

### Get One Contact by URL Parameter

```text
GET http://localhost:8080/contacts/:id
```

Replace `:id` with a contact's MongoDB `_id` value.

### Get One Contact by Query Parameter

```text
GET http://localhost:8080/contacts?id=<contact-id>
```

The query-parameter form is also supported for the course instruction that describes retrieving a contact by an ID query parameter.

## Technical Architecture

```text
backend/
├── config/
│   └── db.js
├── models/
│   └── contactsModel.js
├── controllers/
│   └── contactsController.js
├── data/
│   └── contacts.js
├── routes/
│   └── contactsRoutes.js
├── .env
└── server.js
```

- `config/db.js` owns the MongoDB connection.
- `data/contacts.js` contains the seed records used during database setup.
- `scripts/seedContacts.js` imports the seed records into MongoDB.
- `models/contactsModel.js` contains contacts collection queries.
- `controllers/contactsController.js` contains request validation and response logic.
- `routes/contactsRoutes.js` defines the Contacts GET routes.
- `server.js` configures Express, connects the routes, connects to MongoDB, and starts the server.

## Security Requirements

- MongoDB credentials are stored in `backend/.env`.
- `backend/.env` must not be committed to GitHub.
- `node_modules` must not be committed to GitHub.
- Credentials must not be hardcoded in JavaScript files.
- The Render deployment must use config vars instead of a committed `.env` file.

## Deliverables

- Working Node.js and Express project.
- MongoDB Atlas connection.
- `contacts` collection with at least three documents.
- GET-all contacts endpoint.
- GET-single-contact endpoint.
- REST client test file.
- Protected environment configuration.
- Local testing evidence.
- Render deployment and deployment test evidence.

## Acceptance Criteria

The Week 01 work is complete when:

- Express starts without configuration errors.
- MongoDB connects successfully.
- The `contacts` collection contains at least three valid documents.
- `GET /contacts` returns all contacts from MongoDB.
- `GET /contacts/:id` returns the matching contact from MongoDB.
- `GET /contacts?id=<id>` returns the matching contact from MongoDB.
- Invalid IDs return a clear client error.
- Unknown contact IDs return HTTP `404`.
- The endpoints work through a REST client.
- The API is tested at its published Render URL.
- `.env` and `node_modules` are excluded from GitHub.

## Testing Plan

1. Start the API locally with `npm start`.
2. Request `/` to confirm the server is running.
3. Request `/contacts` and confirm at least three records are returned.
4. Copy one returned `_id` value.
5. Request `/contacts/:id` with that ID.
6. Request `/contacts?id=<id>` with that ID.
7. Test an invalid ID and a non-existent ID.
8. Deploy to Render and repeat the successful endpoint tests using the Render URL.

## Current Verification Evidence

The following local work has been completed:

- MongoDB connected successfully.
- Database `cse341` contains a `contacts` collection.
- Three contact documents were imported.
- The repeatable `npm run seed` database import command was added.
- `GET /contacts` returned HTTP `200` and three contacts.
- `GET /contacts/:id` returned HTTP `200` for a valid MongoDB ID.
- `GET /contacts?id=<id>` returned HTTP `200` for a valid MongoDB ID.
- Invalid IDs returned HTTP `400`.
- Unknown contact IDs returned HTTP `404`.
- The backend uses separate config, model, controller, route, and server files.
- Render health check returned the expected API message at `https://cse341-6gdb.onrender.com/`.
- Render `GET /contacts` returned all three MongoDB contacts.
- Render `GET /contacts/:id` returned the matching contact.

Local and Render GET work is complete. GitHub publication, the required video, and the Week 02 write endpoints remain future work for this assignment phase.
