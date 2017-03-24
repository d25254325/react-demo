var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('superSecret',config.secret);

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(morgan('dev'));


var apiRoutes = express.Router();

apiRoutes.post('/authenticate',function(req,res){
    User.findOne({ name: req.body.name },function(error,user){
        if(error) throw error;
        if(!user){
            res.json({ 
                success:false,
                message: 'Authentication failed. User not found.'
             });
        }else if(user){
            if(user.passWord !== req.body.passWord){
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            }else{
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60*60*24
                    // expiresInMinutes: 1440 not support this type anymore
                    });
                res.json({
                    success: true,
                    message: 'authentication successfully.',
                    token: token
                });
            }
        }
    });
});

apiRoutes.use(function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, app.get('superSecret'),function (err,decoded) {
            if(err){
                return res.json({
                    success: false,
                    message: 'Fail authenticate token. '
                });
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

apiRoutes.get('/', function(request,response){
    response.send('Hello! The API is at http://localhost:' + port + '/api');
});
apiRoutes.get('/users',function(req,res){
    User.find({}, function(err,users){
        res.json(users);
    });
});

app.use('/api',apiRoutes);
// apiRoutes.get('/setup',function(request,response){
//     var duy = new User({
//         name: 'Cao Quang Duy',
//         passWord: '123456',
//         admin: true
//     });
//     duy.save(function(err){
//         if(err) throw err;
//         response.json({ success:true });
//         console.log('add new user successfully');
//     });
// });

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
