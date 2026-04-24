# BFHL Project

## About

I made a simple full stack app with an API that takes inputs like "A->B" and turns them into tree structures.
It also checks for duplicates, invalid inputs, and cycles.

---

## Links

API: https://fullstack-api-tester.onrender.com/bfhl
Frontend: https://full-stack-api-tester.vercel.app/

---

## Tech

Node.js, Express, HTML, CSS, JavaScript

---

## How to Use

Send a POST request to `/bfhl` with:

```json
{ "data": ["A->B", "B->C"] }
```

---

## Run on your own computer

Backend:

```
cd backend
npm install
npm start
```

Frontend:
Open `index.html`

---

## Notes

Includes validation, duplicate handling, tree building, and cycle detection.
