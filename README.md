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
- Project connected to GitHub on the `main` branch.

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

## GitHub and Security Verification

The project is connected to a GitHub remote and has committed project history. Verification confirmed that `backend/.env`, `.env`, and `node_modules` are not tracked by Git. This keeps MongoDB credentials and generated dependencies out of the repository.

## Rubric Alignment

- **1. API Endpoints, 60 points:** `GET /contacts` retrieves all documents from MongoDB. `GET /contacts/:id` and `GET /contacts?id=<id>` retrieve and return one matching contact from MongoDB. These are the two requests to demonstrate in the video.
- **2. Deployment, 10 points:** the same endpoints are available publicly w proving the application works outside the local machine.
- **3. Security, 10 points:** the MongoDB URI is stored in the ignored `backend/.env` file locally. GitHub must contain neither `backend/.env` nor `node_modules`; Render receives the database values as environment config variables.
- **4. Architecture, 20 points:** `backend/models/contactsModel.js` contains database queries, `backend/controllers/contactsController.js` handles validation and responses, `backend/routes/contactsRoutes.js` defines URL mappings, and `backend/server.js` connects the routes and database startup.

The detailed implementation history, verification results, and troubleshooting are documented in [statement-of-work.md](statement-of-work.md).

## MVC Note

This is an API-only project, so there is no server-rendered View layer. The API returns JSON for future frontends and is tested with REST Client and Render. The Model, Controller, and route layers are separated as required by the rubric.
