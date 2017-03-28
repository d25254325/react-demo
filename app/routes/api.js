var jwt = require('jsonwebtoken');
var express = require('express');
var User = require('../DAOmodels/user');
var SongController = require('../controllers/SongController');
var UserController = require('../controllers/UserController');

var apiRoutes = express.Router();

module.exports = function (app) {
    
    // apiRoutes.post('/users',UserController.createUser);

    apiRoutes.post('/authenticate',function(req,res){
        User.findOne({ userName: req.body.userName },function(error,user){
            if(error) throw error;
            if(!user){
                res.json({ 
                    success:false,
                    message: 'Authentication failed. User not found.'
                });
            }else if(user){
                user.verifyPassword(req.body.passWord, function(err, isMatch) {
                    if (err){
                        res.json({
                            success: false,
                            message: 'Authentication failed. '
                        });
                        throw err;
                    }else{
                        if(isMatch){
                            var token = jwt.sign(user, app.get('superSecret'), {
                                expiresIn: 60*60*24
                                // expiresInMinutes: 1440 not support this type anymore
                                });
                            res.json({
                                success: true,
                                message: 'authentication successfully.',
                                token: token
                            });
                        }else{
                            res.json({
                            success: false,
                            message: 'Authentication failed. '
                        });
                        }
                        
                    } 
                });
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

    apiRoutes.get('/users',UserController.getUsers);

    apiRoutes.get('/songs',SongController.getSongs);
    apiRoutes.get('/songs/:song_id',SongController.getSong);
    apiRoutes.post('/songs',SongController.createSong);
    apiRoutes.put('/songs/:song_id',SongController.updateSong);
    apiRoutes.delete('/songs/:song_id',SongController.deleteSong);

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

    app.use('/api',apiRoutes);
};



