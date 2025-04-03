import { createStore, combineReducers } from 'redux';
import { productReducer } from './reducers/productReducer';

const rootReducer = combineReducers({
  productsState: productReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
