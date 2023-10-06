
/* GET Home page. */

module.exports.home = function(req, res, next) {

    console.log('====> From indexController home');

    res.render('index', {

        title: 'Home',

        userName: req.user ? req.user.username : ''

    });

};

 

 

/* GET About page. */

module.exports.about = function(req, res, next) {

    console.log('====> From indexController about');

    res.render('index', {

        title: 'About',

        userName: req.user ? req.user.username : ''

    });

};

 

/* GET Projects page. */

module.exports.projects = function(req, res, next) {

    console.log('====> From indexController projects');

    res.render('index', {

        title: 'Projects',

        userName: req.user ? req.user.username : ''

    });

};

 

/* GET Services page. */

module.exports.services = function(req, res, next) {

    console.log('====> From indexController services');

    res.render('index', {

        title: 'Services',

        userName: req.user ? req.user.username : ''

    });

};

 

/* GET Contact page. */

module.exports.contact = function(req, res, next) {

    console.log('====> From indexController contact');

    res.render('index', {

        title: 'Contact',

        userName: req.user ? req.user.username : ''

    });

};