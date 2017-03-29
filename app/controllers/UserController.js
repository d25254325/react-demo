var userModel = require('../models/userModel');
var requestFilter = require('../helper/requestFilter');

exports.getUsers = function(req,res){
    userModel.getUsers(function (result) {
        if (result) {
            res.json(result);
        }
    });
};
exports.getUser = function (req,res) {
    var id = req.params.user_id;
    userModel.getUser(id,function (result) {
        if (result) {
            res.json(result);
        }
    });
}
exports.createUser = function (req,res) {
    
    if (requestFilter.checkRequireUserBody(req,res)) {
        var userObj = {
            name: req.body.name || '',
            userName: req.body.userName,
            passWord: req.body.passWord,
            admin: req.body.admin || false
        };
        userModel.createUser(userObj,function (result) {
            if(result){
                res.json(result);
            }
        });
    }
    
}
exports.updateUser = function (req,res) {
    var id = req.params.user_id;
    if(requestFilter.checkRequireUserBody(req,res)){
        var userObj = {
            name: req.body.name || '',
            userName: req.body.userName,
            passWord: req.body.passWord,
            admin: req.body.admin || false
        };
        userModel.updateUser(id,userObj,function (result) {
            if (result) {
                res.json(result);
            }
        });
    }
    
}

exports.deleteUser = function (req,res) {
    var id = req.params.user_id;
    userModel.deleteUser(id,function(result){
        if (result) {
            res.json(result);
        }
    });
}