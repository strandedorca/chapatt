# Chapatt Project

Welcome to our Chapatt project repository!

## Overview

Our project aims to develop a web-based chat application inspired by popular platforms like Discord, Messenger, and Telegram. This application will facilitate real-time communication through text, allowing users to create, join, and manage personal and group chat channels.

## Main Features

1. Real-Time Messaging: Users can send and receive messages instantly in personal chats or servers.
2. Server Management: 
    * Users can create, join, delete, and organize servers for various topics or groups.
    * Users can send and receive messages in servera in real time.
3. Authentication: Secure user login and authentication for access to the application.
4. Registrations: User registration and account management like deletion.
5. Friends System: 
    * Users can send, accept and refuse friend requests, as well as removing friends or blocking user.
    * Users can see friend list, pending list and blocking list in real time.
6. Account Settings: Users can change account-related information like username, password,...
7. Customization: Users can set the image of  their account and servers.
   
~~8. Color mode: Users can toggle between light and dark mode.~~

## Technologies Used

* Frontend: Developed with React, leveraging Redux & Redux toolkit for state management and React Router for navigation. We will write our code in TypeScript to ensure type safety and better developer experience.
* Backend: Prepared with Firebase.
* Styling: Material UI (MUI) for React components and CSS module for customization.
* Other Technologies:
    * Formik: To handle forms and user inputs efficiently.
    * Redux thunk: For making HTTP requests to our backend services.
    * Toastify: For making toasts to show to users.

## Latest Changes
* 5/3/2024: 
    * Add server feature: create with image, join, add member, show members, leave & delete servers.
    * Right sidebar shows server information when navigated to a server.
    * Add changing account's photoURL.
    * Add hidden scrollbars.
    * Fix wrong user display bug.
* 24/2/2024:
    * Set up authentication with email/password and google.
    * Database

## Installation

To run our ChapAtt project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install` or `yarn install`.
4. Start the development server using `npm start` or `yarn dev`.
5. Open your web browser and navigate to http://localhost:5173 to view the application.

## Contributors
- [Tran Dang Duong](https://github.com/Henry-Tran-7198).
- [Bui Minh Hieu](https://github.com/hieubui17b8).
- [Vu Van Dat](https://github.com/DatVu121).
- [Vu Thi Huyen](https://github.com/HuyenVu121100).
- [Ha Quang Doanh](https://github.com/HakimJeck).

## Acknowledgements

We would like to express our gratitude to FPT Software Academy for providing us with the opportunity to work on this project and further develop our skills in React and TypeScript. Additionally, we'd like to thank our instructors and mentors for their guidance and support throughout the duration of the bootcamp.
