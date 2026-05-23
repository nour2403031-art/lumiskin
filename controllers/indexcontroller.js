exports.getHome = (req, res) => {
  res.render('index', { user: req.session.user || '' });
};

exports.getAbout = (req, res) => {
  res.render('about', { user: req.session.user || '' });
};

exports.getProducts = (req, res) => {
  res.render('products', { user: req.session.user || '' });
};

exports.getQuiz = (req, res) => {
  res.render('quiz', { user: req.session.user || '' });
};

exports.getMythVsFact = (req, res) => {
  res.render('mythVSfact', { user: req.session.user || '' });
};

exports.getCerave = (req, res) => {
  res.render('cerave', { user: req.session.user || '' });
};

exports.getLaroche = (req, res) => {
  res.render('laroche-products', { user: req.session.user || '' });
};

exports.getUriage = (req, res) => {
  res.render('uriage', { user: req.session.user || '' });
};