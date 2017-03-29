var Promise = require('promise');
var SongDAO = require('../DAOmodels/song');

exports.getSongs = function(callback){
    var result = {
        success: false,
        err: null,
        data: null
    };
    SongDAO.find(function (error,recievedObjs) {
        if(error){
            result.err = error;
        }else{
            result.success = true;
            result.data = recievedObjs;
        }
        callback(result);
    });
}

exports.getSong = function (id,callback) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    SongDAO.findById(id,function (error,recievedObj) {
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

exports.createSong = function (songObj,callback) {
    var song = new SongDAO();

    song.name = songObj.name;
    song.author = songObj.author;
    song.lyric = songObj.lyric;
    song.type = songObj.type;

    var result = {
        success: false,
        err: null,
        data: null
    };
    song.save(function (error) {
        if(error){
            result.err = error;
        }else{
            result.success = true;
            result.data = song;
        }
        callback(result);
    });
}

exports.updateSong = function (id,songObj,callback) {

    var result = {
        success: false,
        err: null,
        data: null
    };

    SongDAO.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            callback(result);
        }else{

            if(recievedObj === null){
                result.err = "object not exist.";
                callback(result);
            }else{
                var temp = Object.assign(recievedObj, songObj);
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

exports.deleteSong = function (id,callback) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    SongDAO.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            callback(result);
        }else{
            if(recievedObj === null){
                result.err = "object not exist.";
                callback(result);
            }else{

                SongDAO.findByIdAndRemove(id,function (error) {
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
