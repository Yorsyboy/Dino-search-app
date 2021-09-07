const loginRoutes = (app, fs) => {

    // READ
    app.post('/api/login', (req, res) => {

        const userDetails = req.body;

        if(userDetails.username && userDetails.password) {
            res.status(200).send({
                token: "QXJlbid0IHdlIHRoZSBsaXR0bGUgZGV0ZWN0aXZlPyA6KSBUaGFua3MgZm9yIHB1cmNoYXNpbmcgdGhlIEJlZ2lubmVyJ3MgR3VpZGUgdG8gUmVhbCBXb3JsZCBSZWFjdC4=",
                authenticated: true,
            });
            return;
        }

        res.status(401).send("user not authorised");
    });
};

module.exports = loginRoutes;