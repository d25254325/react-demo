import { combineReducers } from 'redux'
import SongReducer from './songsReducer'
import UserReducers from './userReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    user: UserReducers,
    songs: SongReducer,
    form: formReducer
});

export default rootReducer;