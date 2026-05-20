import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './styles/app.scss';
import './styles/editor.scss';
import './styles/header.scss';
import './styles/html.scss';

import App from './components/App';
import reducer from './reducers';

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
