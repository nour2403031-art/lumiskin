exports.getDashboard = (req, res) => {
  if (!req.session.user) return res.redirect('/user/login');
  res.render('admin', { user: req.session.user });
};