var Promise = require('promise');
var SongDAO = require('../DAOmodels/song');

exports.getSongs = function(res){
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
        res.json(result);
    });
}

exports.getSong = function (id,res) {
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
        res.json(result);
    });
}

exports.createSong = function (songObj,res) {
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
        res.json(result);
    });
}

exports.updateSong = function (id,songObj,res) {

    var result = {
        success: false,
        err: null,
        data: null
    };

    SongDAO.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            res.json(result);
        }else{

            if(recievedObj === null){
                result.err = "object not exist.";
                res.json(result);
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
                    res.json(result);
                });
            }

        }
        
    });
}

exports.deleteSong = function (id,res) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    SongDAO.findById(id,function (error,recievedObj) {
        if(error){
            result.err = error;
            res.json(result);
        }else{
            if(recievedObj === null){
                result.err = "object not exist.";
                res.json(result);
            }else{

                SongDAO.findByIdAndRemove(id,function (error) {
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
