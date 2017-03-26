var DAOUser = require('../DAOmodels/user');

exports.getUsers = function (res) {
     var result = {
        success: false,
        err: null,
        data: null
    };
    DAOUser.find(function (error,recievedObjs) {
        if(error){
            result.err = error;
        }else{
            result.success = true;
            result.data = recievedObjs;
        }
        res.json(result);
    });
}

exports.getUser = function (id,res) {
     var result = {
        success: false,
        err: null,
        data: null
    };
    DAOUser.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
        }else{
            if(recievedObj === null){
                result.err = "object not exist.";
            }else{
                result.success = true;
                result.data = recievedObj;
            }
        }
        res.json(result);
    });
}

exports.createUser = function(userObj,res){
    var user = new DAOUser({
        name: userObj.name,
        userName: userObj.userName,
        passWord: userObj.passWord,
        admin: userObj.admin
    });
    var result = {
        success: false,
        err: null,
        data: null
    };
    
    user.save(function (err) {
        if (err) {
          result.err = err;  
        }else{
            result.success = true;
            result.data = user;
        }
        res.json(result);
    });
};

exports.updateUser = function (id,userObj,res) {

    var result = {
        success: false,
        err: null,
        data: null
    };

    DAOUser.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            res.json(result);
        }else{

            if(recievedObj === null){
                result.err = "object not exist.";
                res.json(result);
            }else{
                var temp = Object.assign(recievedObj, userObj);
                recievedObj = temp;
                recievedObj.save(function (error) {
                    if(error){
                        result.err = error;
                    }else{
                        result.success = true;
                        result.data = recievedObj;
                    }
                    res.json(result);
                });
            }

        }
        
    });
}

exports.deleteUser = function (id,res) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    DAOUser.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            res.json(result);
        }else{
            if(recievedObj === null){
                result.err = "object not exist.";
                res.json(result);
            }else{

                DAOUser.findByIdAndRemove(id,function (error) {
                    if(error){
                        result.err = error;
                    }else{
                        result.success = true;
                        result.data = recievedObj;
                    }
                    res.json(result);
                });

            }
        }
    });
}