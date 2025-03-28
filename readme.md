# 📝 Task Management Application

###  **Overview**
This is a **Fullstack Task Management Application** built using:
- **Backend:** FastAPI (Python)
- **Frontend:** React.js with **Shadcn** for UI
- **Database:** MySQL using SQLAlchemy ORM
- **Authentication:** JWT (JSON Web Token)
- **Features:** Fully responsive, functional, and scalable.

---

### **Tech Stack**
- **Backend:**
  - FastAPI (for building APIs)
  - SQLAlchemy (ORM for database interaction)
  - MySQL (for data storage)
  - JWT (for secure authentication)
- **Frontend:**
  - React.js (component-based UI)
  - Shadcn (for elegant and modern UI components)
  - Axios (for API calls)
- **Middleware:**
  - Custom middleware for authentication and authorization.
  - CORS middleware for secure cross-origin requests.

---

### 🔥 **Features**
✅ **User Authentication:**
- JWT-based authentication and token validation.
- Secure login, registration, and protected routes.

✅ **Task Management:**
- Create, read, update, and delete (CRUD) tasks.
- Tasks associated with users (user-specific tasks).

✅ **Responsive UI:**
- Built using **Shadcn** for a clean and modern look.
- Fully responsive, optimized for mobile and desktop devices.

✅ **Database with ORM:**
- **MySQL** database with **SQLAlchemy** ORM.
- Efficient and secure data handling.

✅ **Middleware and Error Handling:**
- Custom middlewares for token verification.
- Global exception handling for consistent error responses.

---

### 🛠️ **Installation & Setup**

#### **Backend Setup**
```bash
# Clone the repository
git clone https://github.com/AmmarTheDeveloper/Fastapi-react-fullstack-task-management-app.git
cd server

# Install dependencies
# also some more things need to be installed, you can figure out by the errors
pip install -r requirements.txt

# Create the MySQL database and configure
# update the db/config.py according to your database
# SQLALCHEMY_DATABASE_URI = "mysql+pymysql://username:password@localhost/task_db"

# update the secret key in the helper/token.py
# SECRET_KEY = "your_jwt_secret_key"

# Run the FastAPI server
fastapi dev main.py

```

#### **Frontend Setup**
```bash
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev

```


#### **🔥 API Endpoints**

- **Auth Routes**

    - POST /register → Register new user

    - POST /login → Login and get JWT token

    - POST /verify → verify token and get decoded payload

- **Task Routes**

    - GET /tasks → Get all tasks for the authenticated user

    - POST /tasks → Create a new task

    - PUT /tasks/{id} → Update a task

    - DELETE /tasks/{id} → Delete a task

#### **🌟 Usage**

Start the backend and frontend servers.

Access the application at: http://localhost:5173

Register a new user or login with existing credentials.

Create, update, and manage tasks efficiently.

#### 🚀 Future Improvements
Add role-based access control (RBAC).

Implement task prioritization and deadlines.

Add email notifications for task reminders.

Enhance security features (rate limiting, CSRF protection).

#### 🛡️ Security Measures
JWT authentication for secure access.

CORS middleware to prevent unauthorized access.

Global exception handling to prevent data leaks.

#### 💡 Contributing
If you'd like to contribute:

Fork the repository.

Create a new branch.

Make your changes and submit a pull request.

#### 📄 License
This project is licensed under the MIT License. You are free to modify and distribute it with attribution.

#### 📧 Contact
For any queries or contributions, feel free to contact:

Developer: Mohammad Ammar Ansari

Email: ammarthedeveloper@gmail.com

