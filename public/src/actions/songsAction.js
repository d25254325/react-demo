import * as types from './actionTypes'
import axios from 'axios'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

// load songs
export function loadSongs(songs,tokenFromStorage){
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/songs`,
        header: []
    });
    return {
        type: types.LOAD_SONGS,
        payload: request
    };
}
export function loadSongsSuccess(songs){
    return {
        type: types.LOAD_SONGS_SUCCESS,
        payload: songs
    };
}
export function loadSongsFailure(error){
    return {
        type: types.LOAD_SONGS_FAILURE,
        payload: error
    };
}
export function resetSongs(){
    return {
        type: types.RESET_SONGS
    };
}

// create new song
export function createSong(props, tokenFromStorage){
    const request = axios({
        method: 'post',
        data: props,
        url: `${ROOT_URL}/songs`,
        header: {
            'x-access-token': tokenFromStorage
        }
    });
    return {
        type: types.CREATE_SONG,
        payload: request
    };
}
export function createSongSuccess(newSong){
    return {
        type: types.CREATE_SONG_SUCCESS,
        payload: newSong
    };
}
export function createSongFailure(error){
    return {
        type: types.CREATE_SONG_FAILURE,
        payload: error
    };
}
export function resetNewSong(){
    return {
        type: types.RESET_NEW_SONG
    };
}

// get song by id
export function getSong(id,tokenFromStorage){
    // const request = axios.get(`${ROOT_URL}/songs/${id}`);
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/songs/${id}`,
        header: {
            'x-access-token': tokenFromStorage
        }
    });
    return {
        type: types.GET_SONG,
        payload: request
    };
}
export function getSongSuccess(activeSong){
    return {
        type: types.GET_SONG_SUCCESS,
        payload: activeSong
    };
}
export function getSongFailure(error){
    return {
        type: types.GET_SONG_FAILURE,
        payload: error
    };
}
export function resetActiveSong(){
    return {
        type: types.RESET_ACTIVE_SONG
    };
}

// update song by id
export function updateSong(props, tokenFromStorage,id){
    const request = axios({
        method: 'put',
        data: props,
        url: `${ROOT_URL}/songs/${id}`,
        header: {
            'x-access-token': tokenFromStorage
        }
    });
    return {
        type: types.UPDATE_SONG,
        payload: request
    };
}
export function updateSongSuccess(updatedSong){
    return {
        type: types.UPDATE_SONG_SUCCESS,
        payload: updatedSong
    };
}
export function updateSongFailure(error){
    return {
        type: types.UPDATE_SONG_FAILURE,
        payload: error
    };
}

// delete Song by id
export function deleteSong(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/songs/${id}`,
    headers: {
      'x-access-token': tokenFromStorage
    }
  });
  return {
    type: types.DELETE_SONG,
    payload: request
  };
}
export function deleteSongSuccess(deletedSong) {
  return {
    type: types.DELETE_SONG_SUCCESS,
    payload: deletedSong
  };
}
export function deletePostFailure(response) {
  return {
    type: types.DELETE_SONG_FAILURE,
    payload: response
  };
}
export function resetDeleteSong(){
    return {
        type: types.RESET_DELETE_SONG
    };
}

