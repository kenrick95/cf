import * as types from './actionTypes';
import PouchMiddleware from 'pouch-redux-middleware';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import PouchDB from 'pouchdb-browser';

export default function configureStore() {
  const db = new PouchDB('cf');
  // db.changes({
  //   since: 'now',
  //   live: true
  // });

  const pouchMiddleware = PouchMiddleware({
    path: '/cf',
    db,
    actions: {
      remove: doc => {
        return { type: types.DELETE_ENTRY, payload: { id: doc._id } };
      },
      insert: doc => {
        return { type: types.INSERT_ENTRY, payload: { doc } };
      },
      batchInsert: docs => {
        return { type: types.BATCH_INSERT_ENTRY, payload: { docs } };
      },
      update: doc => {
        return { type: types.UPDATE_ENTRY, payload: { doc } };
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
