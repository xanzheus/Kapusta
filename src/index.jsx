import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'APP/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import 'modern-normalize/modern-normalize.css';
import 'styles/base.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>loading...</div>}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
