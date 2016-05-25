import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
const reducers = require('../reducers')


module.exports = function(initialState, middleware) {
  //const store = redux.createStore(reducers, initialState)
  const logger = createLogger();
  let middlewares = [ middleware, thunk, promise, logger];
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
