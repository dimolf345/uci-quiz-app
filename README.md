# UCI-QUIZ-APP: A MERN FULL-STACK PROJECT FOR ITALIAN NAVY DUTY OFFICERS

- ## Tech Stack
  1. ViteJS with React-template as frontend
  2. Node with Express as backend
  3. MongoDB for storing data

- ## Overview
    The users will be able to register as normal user or admin to the app and take quizzes regarding duty on board.

    Once registered, normal user will have a history track of quiz performed and percentage score.

    If not registered, a guest user will be set automatically so there will be no possibility to retrieve past quizzes for guests.

    Admin can see all the quizzes taken by users as long as modify questions DB.

- ## Installation
  1. Download the code or clone the project
  2. run `npm install` in the root foolter from terminal
  3. `cd client && npm install` from terminal
  4. `cd server && npm install` from terminal

- ## Scripts (must be executed in the root folder, neither the client nor the server)
  - `npm start`: runs both the client and the server in development conneting to MongoDB cloud cluster (you must provide your own connection string with MongoDB atlas in a .env file)
  - `npm run start:local`: runs both the client and the server in development mode conneting to local hosted mongoDB (you must have installed mongoDB on your local machine)
  - `npm run client` or `npm run server`: runs only either the client or the server 