📌 MERN To-Do List Application
A simple To-Do List application built with MERN Stack (MongoDB, Express.js, React, Node.js) with authentication and CRUD functionality.

🚀 Features
✅ User authentication (JWT-based)
✅ Register/Login with validation
✅ Add, Edit, Delete, and Mark tasks as complete
✅ Responsive UI with Tailwind CSS
✅ State management using Redux
✅ Secure API calls using Axios

⚙️ Tech Stack
Frontend: React, Redux, Tailwind CSS, React Router
Backend: Node.js, Express.js, MongoDB
State Management: Redux Toolkit
Authentication: JWT (JSON Web Token)
API Calls: Axios


📂 Project Structure
bash
Copy
Edit
mern-todo-app/
│── client/           # Frontend (React)
│   ├── src/
│   │   ├── pages/      # App Pages (Login, Register, Todo)
│   │   ├── redux/      # Redux Store & Slices
│   │   ├── utils/      # API configurations (Axios)
│   ├── public/
│   |    ├──images
│   ├── .gitignore
│   ├── package.json
│── server/           # Backend (Node.js & Express)
│   ├── models/       # MongoDB Schemas
│   ├── routes/       # Express Routes
│   ├── controllers/  # Todo and user Logic
│   ├── middleware/   # Authentication Middleware
│   ├── .env          # Environment Variables
│   ├── app.js        # Main app.js file
│   ├── package.json
│── README.md         # Project Documentation
│── .gitignore
🛠 Installation & Setup
Clone the Repository

bash
Copy
Edit
git clone https://github.com/DiwanshGupta/TodoTask-CodersBay.git
cd mern-todo-app
Install Dependencies

For Backend
bash
Copy
Edit
cd server
npm install
For Frontend
bash
Copy
Edit
cd client
npm install
Set up .env files

In the server/ directory, create a .env file and add:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
Run the Application



Start Backend
bash
Copy
Edit
cd server
npm start


Start Frontend
bash
Copy
Edit
cd client
npm run dev


🔥 API Routes
Route	Method	Description
/api/user/register	GET 	Fetch user Data
/api/user/register	POST	Register a new user
/api/user/login	    POST	Login user & get token
/api/todo	        GET	Fetch all todos
/api/todo	        POST	Create a new todo
/api/todo/:id	    PUT	Update a todo
/api/todo/:id	    DELETE	Delete a todo