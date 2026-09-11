# CSE 341 Contacts API

REST API for the CSE 341 W01 Contacts Part 1 project.

## Local Setup

From the project root:

```powershell
npm install
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

## REST Client Testing

Open `contacts.rest` with the REST Client extension in VS Code. Run the health check, get-all request, and single-contact requests. Replace the sample ID with an `_id` returned by the get-all request if needed.

## Render Deployment

The included `render.yaml` defines the service configuration. In Render, add:

- `MONGODB_URI`: the Atlas connection string
- `MONGODB_DB`: `cse341`

Render uses port `10000` through its `PORT` environment variable. The application reads that variable automatically.
