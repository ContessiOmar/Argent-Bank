import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

export default rootReducer;
