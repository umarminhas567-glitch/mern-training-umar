How to run this project step by step:

1. Requirements
    Node js Version 18 or higher
    npm Version 9 or higher
    MySQL Server Version 8 0 or higher Must be running
    Git Installed and configured

2. Clone Project  (In an empty folder right click and select (oprn GitBash here) where you have to clone the project)
    Open terminal and clone the project:
    git clone repository-url (your git url)
    cd project-folder-name (ur project folder name)

3. Install Dependencies
    Open terminal for backend and run: (use the code editor's terminal)

        cd api   for backend
        npm install
        cd ..

    Open terminal for frontend and run:

        cd client   for frontend
        npm install
        cd ..

4. Database Setup
    Open MySQL in terminal:

        mysql -u root -p
    Note: if this occoure 'mysql' is not recognized as an internal or external command you need to add MySQL bin:
        "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
    then enter password of your MySQL 

    Run these commands:

        CREATE DATABASE mern_training;
        USE mern_training;
        SOURCE api/schema.sql;
        EXIT;

5. Setup .env Files
    Make a copy of .env.example files for both backend (api/.env) and frontend (frontend/.env).
    Add your MySQL password in api/.env.
    Check links:

        FRONTEND_URL=http://localhost:5173
        VITE_API_BASE_URL=http://localhost:5000/api

6. Run App
    Terminal 1 (Backend):

        cd api
        npm run dev

    Terminal 2 (Frontend):

        cd client
        npm run dev

7. Test
    Open browser and go to: http://localhost:5173
    If the page loads and shows data, everything is working!