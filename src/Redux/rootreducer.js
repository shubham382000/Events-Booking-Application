import { combineReducers } from 'redux';
import * as alertreducer from '././Alerts/alerts.reducer';
import * as UserReducer from './Users/users.reducer';
import * as evevtReducer from './Events/events.reducer';

const rootreducer = combineReducers({

   [alertreducer.alertFeatureKey]: alertreducer.reducer,
   [UserReducer.usersFeatureKey]: UserReducer.reducer,
   [evevtReducer.eventFeatureKey]: evevtReducer.reducer

});

export { rootreducer }