"use client";

import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import UserAuthReducer from "./Reducer/UserAuthReducer";
import AllUserReducer from "./Reducer/AllUserReducer";
import allBeats from "./Reducer/SettingReducer";
import MediaSettingReducer from "./Reducer/MediaSettingReducer";
import BeatSettingReducer from "./Reducer/BeatSettingReducer";
//import UserInfoReducer from "./Reducer/UserInfoReducer_XXX";
//import MycrmReducer from "./Reducer/MycrmReducer_XXX";

let rootReducer = combineReducers({
  //userInfo: UserInfoReducer,
  auth: UserAuthReducer,
  settings: allBeats,
  dataPrefs: AllUserReducer,
  mediaPrefs: MediaSettingReducer,
  beatPrefs: BeatSettingReducer,
});

// let createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let createCompose = compose;

export const store = legacy_createStore(
  rootReducer,
  createCompose(applyMiddleware(thunk))
);
