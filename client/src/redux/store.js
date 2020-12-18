import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import searchReducer from  './state/search.state';
import searchSaga from './saga/search.saga';
import userReducer from './state/user.state';
import userSaga from './saga/user.saga';
import commonReducer from './state/fetch.state';


const reducer = combineReducers({
  search: searchReducer,
  user: userReducer,
  common: commonReducer,
});
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

function* rootSaga() {
  yield all([searchSaga(), userSaga()]);
}
sagaMiddleware.run(rootSaga);

export default store;