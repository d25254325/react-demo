var songModel = require('../models/songModel');
var requestFilter = require('../helper/requestFilter');

exports.getSongs = function(req,res){
    songModel.getSongs(function (result) {
            if (result) {
                res.json(result);
            }
        });
}

exports.getSong = function (req,res) {
    if (requestFilter.checkRequireSongParams(req,res)) {
        var id = req.params.song_id;
        songModel.getSong(id,function (result) {
            if (result) {
                res.json(result);
            }
        });
    } 
    
}

exports.createSong = function(req,res){
    if (requestFilter.checkRequireSongBody(req,res)) {
        var songObj = {
            name: req.body.name,
            author: req.body.author || '',
            lyric: req.body.lyric || '',
            type: req.body.type || ''
        };
        songModel.createSong(songObj,function (result) {
            if (result) {
                res.json(result);
            }
        });
    }
    
}

exports.updateSong = function (req,res) {
    if(requestFilter.checkRequireSongParams(req,res)){
        var id = req.params.song_id;
        if(requestFilter.checkRequireSongBody(req,res)){
            var songObj = {
                name: req.body.name,
                author: req.body.author || '',
                lyric: req.body.lyric || '',
                type: req.body.type || ''
            };
            songModel.updateSong(id,songObj,function (result) {
                if (result) {
                    res.json(result);
                }
            });
        }
    }
    
}

exports.deleteSong = function (req,res) {
    if(requestFilter.checkRequireSongParams(req,res)){
        var id = req.params.song_id;
        songModel.deleteSong(id,function (result) {
            if (result) {
                res.json(result);
            }
        });
    }
}