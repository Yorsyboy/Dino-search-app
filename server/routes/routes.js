// import other routes
const loginRoutes = require('./login');
const dinoRoutes = require('./dinos');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development dinosaur api-server');
    });

    // // other routes
    loginRoutes(app, fs);
    dinoRoutes(app, fs);    
};

module.exports = appRouter;