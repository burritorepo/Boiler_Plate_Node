const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    };
};

const generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({ id: req.user.id, }, config.passport.secretAuthToken, {
        expiresIn: config.passport.tokenTime
    });
    next();
};

module.exports = {
    checkToken,
    generateAccessToken
};