<div align="center">

<img src="/assets/pollit.svg" width="160px" alt="Pollit Logo" />

  <p>
    <strong>Pollit is a simple polling app. It allows users to create polls and vote on them. The app is built with React Native, @reduxjs/toolkit, and Node.js.</strong>
  </p>
</div>

## Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/Kritik-J/pollit.git
cd pollit
```

```bash
cd app-mobile
npm install
```

```bash
cd backend
npm install
```

## Usage

First, start the server.

```bash
cd backend
npm run dev
```

Then, start the mobile app.

```bash
cd app-mobile
npm start
```

## Environment Variables

For the backend to work properly, you will need to add the following environment variables to your .env file

`MONGODB_URL`

`PORT`

`JWT_SECRET_KEY`

`JWT_EXPIRE`

`JWT_COOKIE_EXPIRES_IN`

`SMTP_HOST`

`SMTP_PORT`

`SMTP_SERVICE`

`SMTP_MAIL`

`SMTP_PASSWORD`

> Note: You can use any value for JWT_SECRET_KEY. JWT_EXPIRE is in the number of days. For example, 30d means the token will expire in 30 days. JWT_COOKIE_EXPIRES_IN is in the number of days. For example, 30 means the cookie will expire in 30 days.
