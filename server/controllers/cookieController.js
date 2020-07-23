const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const { username, id } = res.locals.currentUser;
  res.cookie('kunligiUser', username, { maxAge: 1250000 , path: '/'});
  res.cookie('kunligiId', id, { maxAge: 1250000 , path: '/'});
  return next();
};

cookieController.clearCookie = (req, res, next) => {
  res.clearCookie('kunligiUser');
  res.clearCookie('kunligiId');
  return next();
};

cookieController.verifyCookie = (req, res, next) => {
  if (req.session.user) {
    return next(); //If session exists, proceed to page
  } else {
    const err = new Error('Not logged in!');
    console.log(req.session.user);
    return next({
      log: `ERROR in cookieController.verifyCookie:${err}`,
      message: {
        err:
          'cookieController.verifyCookie: ERROR: Check server log for details.',
      },
    }); //Error, trying to access unauthorized page!
  }
};

cookieController.verifyCookie = (req, res, next) => {
  req.session.destroy(function () {
    console.log('user logged out.');
  });
  return next();
};

module.exports = cookieController;
