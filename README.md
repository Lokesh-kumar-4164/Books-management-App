

# 📚 Books App - MERN Stack

A full-stack **Books Review Application** built with **MERN (MongoDB, Express, React, Node.js)**.  
Users can browse books, submit ratings and reviews, and manage their own reviews.

---

## **Table of Contents**

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Folder Structure](#folder-structure)  
- [Environment Variables](#environment-variables)  
- [API Endpoints](#api-endpoints)  
- [Frontend Routes](#frontend-routes)  
- [Contributing](#contributing)  
- [License](#license)  

---

## **Features**

- ✅ User authentication with **JWT**  
- ✅ Users can add, edit, and delete their own reviews  
- ✅ Book details page with **average rating** calculation  
- ✅ Star rating system with optional text review  
- ✅ Responsive UI with **Tailwind CSS**  
- ✅ Fully **RESTful API** with Node.js & Express  
- ✅ MongoDB Atlas for storing users, books, and reviews  

---

## **Tech Stack**

**Backend:**  
- Node.js, Express  
- MongoDB Atlas, Mongoose  
- bcrypt for password hashing  
- JWT for authentication  
 

**Frontend:**  
- React.js  
- React Router  
- Context API for user authentication state  
- Axios for API requests  
- Tailwind CSS for styling 

---

## **Setup & Installation**

Clone the repository:

```bash
git clone https://github.com/Lokesh-kumar-4164/Books-management-App.git
cd project-root
````

### **Backend**

```bash
cd backend
npm install
npm run start
```

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

The backend will run on `http://localhost:3200` (default) and frontend on `http://localhost:5173` (Vite default).

---

## **Folder Structure**

```text
project-root/
├─ backend/
│  ├─ models/            # Mongoose schemas: User, Book, Review
│  ├─ routes/            # API routes
│  ├─ middleware/        # Auth middleware
│  ├─ server.js          # Express server entry
│  └─ .env               # MongoDB URI & JWT secret (ignored in git)
│
├─ frontend/
│  ├─ src/
│  │  ├─ components/     # React components (BookDetails, Review, etc.)
│  │  ├─ context/        # UserContext + hooks
│  │  ├─ pages/          # React pages
│  │  ├─ services/       # Axios config
│  │  └─ App.jsx
│  
├─ .gitignore
└─ README.md
```

---

## **Environment Variables**

Create `.env` files in **backend** (and frontend if needed):

```env
# backend/.env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=3200
```

* Never commit `.env` to GitHub.
* Use `.gitignore` to protect sensitive credentials.

---

## **API Endpoints (Backend)**

| Method | Route                            | Description                  |
| ------ | -------------------------------- | ---------------------------- |
| POST   | `/users/register`                | Register new user            |
| POST   | `/users/login`                   | Login user and return JWT    |
| GET    | `/books`                         | Get all books                |
| GET    | `/books/:id`                     | Get book details             |
| GET    | `/books/reviews/:bookId`         | Get reviews of a book        |
| POST   | `/books/add-review`              | Add a review (authenticated) |
| PATCH  | `/books/edit-review/:reviewId`   | Edit your review             |
| DELETE | `/books/delete-review/:reviewId` | Delete your review           |

> Note: For protected routes, include JWT in request headers:
> `Authorization: Bearer <token>`

---

## **Frontend Routes**

| Route       | Page                    |
| ----------- | ----------------------- |
| `/`         | Home / Books list       |
| `/book/:id` | Book Details + Reviews  |
| `/login`    | Login Page              |
| `/register` | Register Page           |


---

## **Contributing**

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature-name

# 3. Commit your changes
git commit -m 'Add feature'

# 4. Push to branch
git push origin feature-name

# 5. Open a Pull Request
```

---



---

💡 **Extra Tips for Users / Developers**

* To see pre-populated reviews, you can run a seed script in **backend** to add sample books and reviews.
* Make sure to **update your `.env`** with MongoDB credentials before starting the backend.

```


