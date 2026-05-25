const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
//
// Connect to MongoDB
const DB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lumiskin";

mongoose.connect(DB_URI)
  .then(() => console.log("Connected to MongoDB successfully! "))
  .catch((err) => console.error("MongoDB connection error:", err));
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'lumiskinSecretKeyKeyKey', 
    resave: true, // Forces the session to be saved back to the session store
    saveUninitialized: true,
    cookie: { 
        secure: false, // Set to true if your site uses full HTTPS redirection, false works fine for testing
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

const path = require('path');

// Tell express exactly where your views folder is using an absolute path
app.set('views', path.join(__dirname, 'views'));


// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(8080, () => {
  console.log('Server running! Open http://localhost:8080');
});

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Lumiskin server is running on port ${PORT}`);
});




// Force Vercel to redeploy my app now