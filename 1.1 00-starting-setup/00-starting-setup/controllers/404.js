exports.Page404 = (req, res, next) => {
    res.status(404).render('404', { 
      pageTitle: 'Page Not Found',
      path: null // Set a default value for path, e.g., null or an empty string
    });
  };
  