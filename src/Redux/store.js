import { applyMiddleware, legacy_createStore } from "redux";
import { rootreducer } from "./rootreducer";
import {composeWithDevTools} from 'redux-devtools-extension'; 
import logger from 'redux-logger'; 
import thunk from 'redux-thunk'

 const store = legacy_createStore(rootreducer, composeWithDevTools(applyMiddleware(logger, thunk)));
 
 export {store}