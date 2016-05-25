import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'

const socket = io()
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

injectTapEventPlugin();
const store = configureStore({}, socketIoMiddleware);
window.store = store

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
