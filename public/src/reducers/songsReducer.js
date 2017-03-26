import { 
    loadSongs,loadSongsSuccess,loadSongsFailure, 
    getSong,getSongSuccess,getSongFailure,
    deleteSong,deleteSongSuccess,deletePostFailure,
    resetSongs,resetActiveSong } from '../actions/songsAction'
import * as types from '../actions/actionTypes'

const INIT_STATE = {
    songList: {
        songs: [], 
        error:null, 
        loading: false
    },
    newSong: {
        song: null, 
        error:null, 
        loading: false
    },
    activeSong: {
        song: null, 
        error:null, 
        loading: false
    },
    deletedSong: {
        song: null, 
        error:null, 
        loading: false
    }
};

export default function(state = INIT_STATE,action){
    let error;
    switch(action.type) {
        //get songs
        case types.LOAD_SONGS:
            return {...state, songList: {
                songs: [], 
                error:null, 
                loading: true
            } };
        case types.LOAD_SONGS_SUCCESS:
            return {...state, songList:{
                songs: action.payload,
                error: null,
                loading: false
            }};
        case types.LOAD_SONGS_FAILURE:
            error = action.payload || {message: action.payload.message};
            return {...state, songList:{
                songs: [],
                error: error,
                loading: false
            }};
        case types.RESET_SONGS:// reset postList to initial state
            return { ...state, songList: {
                songs: [], 
                error:null, 
                loading: false
            }};

        //get song
        case types.GET_SONG:
            return {...state, activeSong:{
                ...state.activeSong,
                loading: true
            }};
        case types.GET_SONG_SUCCESS:
            return {...state, activeSong:{
                song: action.payload,
                error: null,
                loading: false
            }};
        case types.GET_SONG_FAILURE:
            error = action.payload || {message: action.payload.message};
            return {...state, activeSong:{
                song: null,
                error: error,
                loading: false
            }};
        case types.RESET_ACTIVE_SONG:
            return {...state, activeSong:{
                song: null,
                error: null,
                loading: false
            }};

        //create song 
        case types.CREATE_SONG:
            return {...state,newSong:{
                ...state.newSong,
                loading: true
            }};
        case types.CREATE_SONG_SUCCESS:
            return {...state, newSong:{
                song: action.payload,
                error: null,
                loading: false
            }};
        case types.CREATE_SONG_FAILURE:
            error = action.payload || {message: action.payload.message};
            return {...state, newSong:{
                song: null,
                error: error,
                loading: false
            }};
        case types.RESET_NEW_SONG:
            return {...state, newSong: {
                song: null,
                error: null,
                loading: false
            }};

        //delete song 
        case types.DELETE_SONG:
            return {...state,deletedSong:{
                ...state.deletedSong,
                loading: true
            }};
        case types.CREATE_SONG_SUCCESS:
            return {...state, deletedSong:{
                song: action.payload,
                error: null,
                loading: false
            }};
        case types.CREATE_SONG_FAILURE:
            error = action.payload || {message: action.payload.message};
            return {...state, deletedSong:{
                song: null,
                error: error,
                loading: false
            }};
        case types.RESET_NEW_SONG:
            return {...state, deletedSong: {
                song: null,
                error: null,
                loading: false
            }};
        
        default:
            return state;
    }
}