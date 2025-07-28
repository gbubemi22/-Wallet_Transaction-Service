**BrickPine**  Wallet & Transaction Service

PostMan Documention
https://documenter.getpostman.com/view/26055191/2sB3B7NDYK

A secure backend monoliticservice built with  **Node.js** ,  **Express** , and  **Prisma ORM** , enabling:

* ✅ User registration and login
* ✅ Wallet creation on registration
* ✅ Secure fund transfers between users
* ✅ Transaction history (debit/credit)
* ✅ MySQL database support

---

### 📦 Tech Stack

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **MySQL** (can be swapped for PostgreSQL)
* **JWT** (for auth)
* **Joi** (for validation)
* **bcrypt** (for hashing passwords)

---

### 🚀 Getting Started

#### 1. Clone the repository

git clone https://github.com/your-username/wallet-service.git
cd wallet-service

Create a `.env` file:

DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"

PORT=7004

SERVICE_NAME='BrickPine'

JWT_SECRET='Testapp001'

ACCESS_TOKEN_SECRET='Testapp123'

JWT_TOKEN_VALIDITY='100d



#### 4. Setup the database

5. Run the development server


🔐 API Authentication

All protected routes use  **JWT authentication** . Include this in the header:


---

### 📚 API Routes

#### ✅ Register User

{
  "email": "user@example.com",
  "password": "yourpassword",
  "fullName": "John Doe"
}
