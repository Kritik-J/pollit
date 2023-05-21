# PollIt App

Pollit is a simple polling app. It allows users to create polls and vote on them. The app is built with React Native, @reduxjs/toolkit, and Node.js and Typescript

The `app-mobile` directory contains all the React Native code for the app.

## App preview

---

### Home Page

<figure>
<center>
  <img src="./assets/mockups/Home.png" height=400>
    <figcaption>Home Page</figcaption>
</center>
</figure>

This page contains all the polls that are available to the user. They can interact with them from here. It also provides the functionality for the user to create polls and the user can also visit their profile.

---

### Authentication Pages

<figure>
<center>
    <img src="./assets/mockups/Register.png" height=400>
    <figcaption>Register Page</figcaption>
</center>
</figure>

The user can register for the application from this page. They need to provide their details and if properly validated, the user will be registered on the platform.

<figure>
<center>
  <img src="./assets/mockups/Login.png" height=400>
    <figcaption>Login Page</figcaption>
</center>
</figure>

Registered users can log onto the application from this page. If not registered they can also redirect themselves to the registration page from here.

<figure>
<center>
  <img src="./assets/mockups/Forgot Password.png" height=400>
    <figcaption>Forgot Password Page</figcaption>
</center>
</figure>

Users can reset their password from this page after OTP verification.

---

### Poll Pages

<figure>
<center>
  <img src="./assets/mockups/Create Poll.png" height=400>
    <figcaption>Create Poll Page</figcaption>
</center>
</figure>

The user can create a poll from this page. It provides an interface to select question types and their question. Answer can also be specified. Apart from questions, metadata about the poll like its title and validity can also be declared from here.

<figure>
<center>
  <img src="./assets/mockups/Poll.png" height=400>
    <figcaption>Vote Poll Page</figcaption>
</center>
</figure>

User can vote on polls from here and submit their answers.
