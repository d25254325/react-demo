var Promise = require('mpromise');

exports.getAll = function(daoObj){
    var result = {
        success: false,
        err: null,
        data: null
    };
    daoObj.find(function (error,recievedObjs) {
        if(error){
            result.err = error;
        }else{
            result.success = true;
            result.data = recievedObjs;
        }
    });
    
    return result;
}

exports.getOne = function (daoObj,id) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    daoObj.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
        }else{
            result.success = true;
            result.data = recievedObj;
        }
    });
    return result;
}

exports.createOne = function(obj){
    var result = {
        success: false,
        err: null,
        data: null
    };
    obj.save(function (error) {
        if(error){
            result.err = error;
        }else{
            result.success = true;
            result.data = obj;
        }
    });
    return result;
}

exports.updateOne = function (id,obj,daoObj) {
    var result = {
        success: false,
        err: null,
        data: null
    };

    daoObj.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
        }
        var temp = Object.assign(recievedObj, obj);
        recievedObj = temp;
        recievedObj.save(function (error) {
            if(error){
                result.err = error;
            }else{
                result.success = true;
                result.data = recievedObj;
            }
        });
    });
    return result;
}

exports.deleteOne = function (id,daoObj) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    daoObj.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
        }
        daoObj.findByIdAndRemove(id,function (error) {
            if(error){
                result.err = error;
            }else{
                result.success = true;
                result.data = recievedObj;
            }
        });
    });
    return result;
}