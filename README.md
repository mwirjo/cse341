# CSE 341 Contacts API

REST API for the CSE 341 W01 Contacts Part 1 project.

This API stores contact records in MongoDB Atlas and provides GET endpoints for retrieving all contacts or one contact by MongoDB ID. The project does not require a frontend. The original frontend files are retained separately in `frontend/` and are not part of this Contacts API.

## Project Status

The following Week 01 work is complete:

- Project initialized with Node.js and npm.
- Express server configured with MVC architecture.
- MongoDB Atlas connected to the `cse341` database.
- `contacts` collection created and seeded with three contacts.
- GET-all and GET-single-contact endpoints implemented.
- Invalid and unknown ID responses implemented.
- REST Client request file added.
- API deployed and tested on Render.

Detailed scope, implementation steps, testing evidence, and troubleshooting are documented in [statement-of-work.md](statement-of-work.md).

## Local Setup

From the project root:

```powershell
npm install
npm run seed
npm start
```

The API runs on `http://localhost:8080` when `backend/.env` contains `PORT=8080`.

## Environment Variables

`backend/.env` must contain:

```env
PORT=8080
MONGODB_URI=<your MongoDB Atlas connection string>
MONGODB_DB=cse341
```

Never commit `backend/.env`. It is excluded by `.gitignore`.

## Endpoints

```text
GET /
GET /contacts
GET /contacts/:id
GET /contacts?id=<id>
```

`GET /contacts` returns every document in the MongoDB `contacts` collection. The single-contact routes return one document by MongoDB ObjectId.

Run `npm run seed` to import the three sample contacts from `backend/data/contacts.js`. The seed uses each contact's email to update existing records instead of creating duplicates.

## REST Client Testing

Open `contacts.rest` with the REST Client extension in VS Code. Run the health check, get-all request, and single-contact requests. Replace the sample ID with an `_id` returned by the get-all request if needed.

## Render Deployment

The included `render.yaml` defines the service configuration. In Render, add:

- `MONGODB_URI`: the Atlas connection string
- `MONGODB_DB`: `cse341`

Render uses port `10000` through its `PORT` environment variable. The application reads that variable automatically.

Live API:

```text
https://cse341-6gdb.onrender.com
```

Verified deployed requests:

```text
GET https://cse341-6gdb.onrender.com/
GET https://cse341-6gdb.onrender.com/contacts
GET https://cse341-6gdb.onrender.com/contacts/6aa34b363ad3b104d30061dd
GET https://cse341-6gdb.onrender.com/contacts?id=6aa34b363ad3b104d30061dd
```

## Rubric Alignment

- **API Endpoints:** all contacts and one contact by ID are retrieved from MongoDB.
- **Deployment:** the API is published at the Render URL above.
- **Security:** `backend/.env` and `node_modules` are excluded by `.gitignore`; Render uses environment config variables.
- **Architecture:** database configuration, model, controller, routes, and server startup are separated into their own files.
