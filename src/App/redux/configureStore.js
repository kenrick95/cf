import * as types from './actionTypes';
import PouchMiddleware from 'pouch-redux-middleware';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import PouchDB from 'pouchdb-browser';

export default function configureStore() {
  const db = new PouchDB('cf');

  const pouchMiddleware = PouchMiddleware({
    path: '/todos',
    db,
    actions: {
      remove: doc => {
        return { type: types.DELETE_ENTRY, id: doc._id };
      },
      insert: doc => {
        return { type: types.INSERT_ENTRY, todo: doc };
      },
      batchInsert: docs => {
        return { type: types.BATCH_INSERT_ENTRY, todos: docs };
      },
      update: doc => {
        return { type: types.UPDATE_ENTRY, todo: doc };
      }
    }
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(pouchMiddleware))
  );

  return store;
}
