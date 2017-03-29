var jwt = require('jsonwebtoken');

function generateUserToken(user,app) {
    var u = {
        name: user.name,
        userName: user.userName,
        admin: user.admin,
        _id: user._id.toString()
    };
    return token = jwt.sign(u, app.get('superSecret'), {
                                expiresIn: 60*60*24
                                // expiresInMinutes: 1440 not support this type anymore
                                });
}

function verifyToken(params) {
    
}

module.exports = {
    generateUserToken: generateUserToken
};