# 🛒 Sokoni Backend

Sokoni, swahili for "Marketplace" is a Fullstack e-commerce platform built with **Node.js**, **Express**, for the **Backend** , **HTML**, **TailwindCSS**, **Vanilla JavaScript** for the Frontend and **Microsoft SQL Server** for the **Database**. It supports:

-   User registration and login with **JWT-based authentication**
-   Product management
-   Cart item handling (add/update/delete)
-   Email notifications using **Nodemailer**

---

## 🚀 Getting Started

Follow these steps to run the project locally:

---

### 📁 1. Clone the Repository

```bash
git clone https://github.com/EvanMworia/Sokoni.git
cd sokoni/Backend

```

### 📦 2. Install Dependencies

```bash
npm install

```

### ⚙️ 3. Setup .env File

-   Create a .env file in the Backend/ folder and add the following:

```env
DB_NAME=Sokoni
DB_PWD=YOUR-SQL-SERVER-PASSWORD
DB_SERVER=YOUR-SQL-SERVER-NAME
DB_USER=sa

JWT_SECRET=YOUR-JWT SECRET

EMAIL_USER=Get-it-from-gmail
EMAIL_PASS=Get-it-from-gmail

```

### 🗄️ 4. Setup the SQL Server Database

-   Navigate to the project folder Backend/db/
-   Open and run both of the following SQL files inside your Sokoni database:

-   schema.sql: Creates all required tables (Users, Products, CartItems, etc.)

-   procedures/\*/\*.sql: Adds all necessary stored procedures to support application features

### ▶️ 5. Start the Backend Server

-   If you followed all the steps above, by now you should be in the Backend/db/procedures directory, move up two directory by:

```bash
cd ..
cd ..

```

-   Now in the Backend Directory run:

```bash
npm start
```

-   If everything is correct, you should see:

```bash
Server running on port 5000
```

### ➡️ Full API documentation and Postman Collection:

```bash
https://stk-push-team.postman.co/workspace/stk-push-101~d1a83f11-bd10-415d-8eec-18ae294ae2a5/collection/32680431-286d70eb-0d7d-41f3-a5f6-8dc6597d2650?action=share&creator=32680431
```
