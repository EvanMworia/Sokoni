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
