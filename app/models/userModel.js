var DAOUser = require('../DAOmodels/user');

exports.getUsers = function (callback) {
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
        callback(result);
    });
}

exports.getUser = function (id,callback) {
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
        callback(result);
    });
}

exports.createUser = function(userObj, callback) {
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
            return callback(result);
        });
  
};
// exports.createUser = function(userObj,res){
//     var user = new DAOUser({
//         name: userObj.name,
//         userName: userObj.userName,
//         passWord: userObj.passWord,
//         admin: userObj.admin
//     });
//     var result = {
//         success: false,
//         err: null,
//         data: null
//     };
    
//     user.save(function (err) {
//         if (err) {
//           result.err = err;  
//         }else{
//             result.success = true;
//             result.data = user;
//         }
//         res.json(result);
//     });
// };


exports.updateUser = function (id,userObj,callback) {

    var result = {
        success: false,
        err: null,
        data: null
    };

    DAOUser.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            callback(result);
        }else{

            if(recievedObj === null){
                result.err = "object not exist.";
                callback(result);
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
                    callback(result);
                });
            }

        }
        
    });
}

exports.deleteUser = function (id,callback) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    DAOUser.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            callback(result);
        }else{
            if(recievedObj === null){
                result.err = "object not exist.";
                callback(result);
            }else{

                DAOUser.findByIdAndRemove(id,function (error) {
                    if(error){
                        result.err = error;
                    }else{
                        result.success = true;
                        result.data = recievedObj;
                    }
                    callback(result);
                });

            }
        }
    });
}