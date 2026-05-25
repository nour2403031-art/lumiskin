require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();

// ── Database ──────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Database connected'))
  .catch(() => console.log(' Database connection failed'));

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// ── View Engine ───────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', './views');

// ── Routes ────────────────────────────────────────────────────────────────────
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', {});
});

// ── 500 Handler ───────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).render('500', {});
});

// ── HTTPS Server ──────────────────────────────────────────────────────────────
const sslOptions = {
  key: fs.readFileSync('cert.key'),
  cert: fs.readFileSync('cert.crt')
};

https.createServer(sslOptions, app).listen(8443, () => {
  console.log(' HTTPS running at https://localhost:8443');
});

// ── Redirect HTTP to HTTPS ────────────────────────────────────────────────────
http.createServer((req, res) => {
  res.writeHead(301, { Location: 'https://localhost:8443' + req.url });
  res.end();
}).listen(8080, () => {
  console.log(' HTTP redirect running at http://localhost:8080');
});
