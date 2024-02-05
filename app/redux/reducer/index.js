import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './AppRedux';

const rootReducer = combineReducers({
	app: appReducer,
});

export default rootReducer;
