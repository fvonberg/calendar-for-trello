import * as Redux from 'redux';
const {combineReducers} = Redux;
import {RootState} from '../store';

import cardsReducer from './cards.reducer';
import boardsReducer from './boards.reducer';
import userReducer from './user.reducer';
import calendarReducer from './calendar.reducer';
import settingsReducer from './settings.reducer';
import listReducer from './list.reducer';
import memberReducer from './member.reducer';

import {routerReducer} from 'ng2-redux-router';

const rootReducer = combineReducers<RootState>({
  router: routerReducer,
  cards: cardsReducer,
  boards: boardsReducer,
  user: userReducer,
  calendar: calendarReducer,
  settings: settingsReducer,
  lists: listReducer,
  members: memberReducer
});

export default rootReducer;
