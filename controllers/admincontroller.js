// Access is already protected by requireLogin middleware in routes/admin.js
exports.getDashboard = (req, res) => {
  res.render('admin', { user: req.session.user });
};
