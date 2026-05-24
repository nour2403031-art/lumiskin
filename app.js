require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch(() => console.log('Database connection failed, but server is still running.'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


// 404 — page not found
app.use((req, res) => {
  res.status(404).render('404', {});
});

// 500 — server error
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).render('500', {});
});


app.listen(process.env.PORT, () => {
  console.log(`Server running! Open http://localhost:${process.env.PORT}`);
});
